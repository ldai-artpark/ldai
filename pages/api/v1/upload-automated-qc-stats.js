import multer from "multer";
import csvParser from "csv-parser";
import * as assert from "assert";
import mongodbClient from "../../../src/node/mongodb-client";
import _ from "lodash";
import findDistrictAndStates from "../../../src/findDistrictAndStates";
import {
    bufferToStream,
    cleanCsvKeys,
    getNumberIfPossibleForValue,
    uploadHandler
} from "../../../src/node/csvParserHelpers";

const uploadFiles = multer({});

uploadHandler.use(uploadFiles.single("file"));

uploadHandler.post( async (req,res) => {

    console.log("upload-automated-qc-stats.js: req.file", req.file);

    res.json = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }

    try{
        assert(req.file, "File missing");
        assert(req.body.hash, "hash is missing");
    }
    catch(e){
        console.log(e);
        res.statusCode = 400;
        res.json({error: e.message});
        res.end();
    }

    const hash = req.body.hash;
    const separator = req.body.separator || "|";

    try{

        await mongodbClient.connect();
        const db = mongodbClient.db("vaani");

        const metaDataCollection = db.collection("automated-qc-hashes");
        const existingHash = await metaDataCollection.findOne({
            hash
        });

        if(existingHash) {
            res.statusCode = 400;
            res.json({error: "Hash already exists"});
            res.end();
            return;
        }

        const readStream = bufferToStream(req.file.buffer);

        const fileReadPromise = new Promise((resolve, reject) => {

            const results = {};
            const newKeys = {};

            readStream.pipe(csvParser({separator}))
                .on("data", (data) => {
                    // console.log("data", data);
                    let cleanData = null;
                    [cleanData,newKeys] = cleanCsvKeys(data, newKeys);

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

        console.log("parsedCSV", parsedCSV);

        const collection = db.collection("automated-qc-stats");

        await collection.insertMany(parsedCSV);

        await metaDataCollection.insertOne({
            hash,
            uploadedAt: new Date().getTime(),
            fileName: req.file.originalname
        });

        res.statusCode = 200;
        res.json({success: true});
        res.end();

    }
    catch (e) {
        res.statusCode = 500;
        res.json({error: e.message});
    }

});

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};

export default uploadHandler;