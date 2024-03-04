import nextConnect from 'next-connect';
import multer from "multer";
import csvParser from "csv-parser";
import {Readable} from "stream";
import * as assert from "assert";
import mongodbClient from "../../../src/node/mongodb-client";
import _ from "lodash";
import {cleanCsvKeys, getNumberIfPossibleForValue} from "../../../src/node/csvParserHelpers";
import findDistrictAndStates from "../../../src/findDistrictAndStates";
// import convertBackFromCamelCase from "../../../src/camelCaseToSpaceSeparatedStr";
// import district_state_map from "../../../src/district_state";

function bufferToStream(binary) {

    return new Readable({
        read() {
            this.push(binary);
            this.push(null);
        }
    });
}

// CSV upload handler and parsing
const uploadHandler = nextConnect({
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
    onError(error, req, res) {
        res.status(500).json({ error: `Sorry something Happened! ${error.message}` });
    }
});


const uploadFiles = multer({});

uploadHandler.use(uploadFiles.single("file"));

const acceptedCSVTSVMimeTypes = ["text/plain" , "text/csv", "text/tsv", "text/tab-separated-values"];
uploadHandler.post( async (req,res) => {

    res.json = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }

    assert(req.file, "File missing");

    const hash = req.body.hash;
    assert(hash, "hash is missing");

    await mongodbClient.connect();
    const db = mongodbClient.db("vaani");

    const metaDataCollection = db.collection("manualqc-incoming-hashes");
    const rawMetadata = await metaDataCollection.findOne({hash});

    if(rawMetadata) {
        res.statusCode = 409;
        res.json({error: "File already exists"});
        await mongodbClient.close();
        return;
    }


    const separator = req.body.separator || ",";

    // const mimeType = req.file.mimetype;
    // if(!acceptedCSVTSVMimeTypes.includes(mimeType)) {
    //     res.statusCode = 400;
    //     res.json({error: "Invalid file type"});
    // }

    const readStream = bufferToStream(req.file.buffer);

    const fileReadPromise = new Promise((resolve, reject) => {

        const results = {};
        let newKeys = {};


        readStream.pipe(csvParser({separator}))
            .on("data", (data) => {

                let cleanData = null;
                const dRes = cleanCsvKeys(data, newKeys);

                cleanData = dRes[0];
                newKeys = dRes[1];

                if(!results[cleanData.district]) {
                    results[cleanData.district] = cleanData;
                }
                else {
                    Object.keys(cleanData).forEach((key) => {
                        typeof cleanData[key] === "number" && (results[cleanData.district][key] += cleanData[key]);
                    });
                }

            }).on("end", () => {

            const cleanRes = Object.keys(results).map((district) => ({
                ...results[district],
                hash
            }));
            resolve(cleanRes);
        }).on("error", (error) => {
            reject(error);
        });
    });

    const parsedCSV = await fileReadPromise;
    console.log(parsedCSV);

    const collection = db.collection(`manualqc-incoming`);

    await collection.insertMany(parsedCSV);

    await metaDataCollection.insertOne({hash, uploadedAt: new Date()});

    try {
        await mongodbClient.close();
    } catch (e) {
        console.error(e);
    }
    finally {
        res.statusCode = 200;
        res.json({success: true});
    }


});


export default uploadHandler;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};