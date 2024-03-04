import multer from "multer";
import csvParser from "csv-parser";
import * as assert from "assert";
import mongodbClient from "../../../src/node/mongodb-client";
import _ from "lodash";
import convertBackFromCamelCase from "../../../src/camelCaseToSpaceSeparatedStr";
import district_state_map from "../../../src/district_state";
import findDistrictAndStates from "../../../src/findDistrictAndStates";
import {bufferToStream, getNumberIfPossibleForValue, uploadHandler} from "../../../src/node/csvParserHelpers";


const fieldsToAccount = [
    "district",
    "spks_per_district",
    "files_per_district",
    "files_per_district_generic",
    "files_per_district_specific",
    "segments_per_district",
    "segments_per_district_generic",
    "segments_per_district_specific",
    "duration_per_district_hrs",
    "duration_per_district_hrs_generic",
    "duration_per_district_hrs_specific",
    "images_per_district",
    "images_per_district_generic",
    "images_per_district_specific",
    "lang",
];



const uploadFiles = multer({});

uploadHandler.use(uploadFiles.single("file"));

uploadHandler.post( async (req,res) => {

    console.log("upload-raw-data-stats.js: req.file", req.file);

    res.json = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }

    assert(req.file, "File missing");

    const org = req.body.org;
    assert(org, "org is missing");

    const hash = req.body.hash;
    assert(hash, "hash is missing");

    await mongodbClient.connect();
    const db = mongodbClient.db("vaani");

    const metaDataCollection = db.collection("raw-hashes");
    const rawMetadata = await metaDataCollection.findOne({hash});

    if(rawMetadata) {
        res.statusCode = 409;
        res.json({error: "File already exists"});
        await mongodbClient.close();
        return;
    }


    const separator = req.body.separator || "\t";

    // const mimeType = req.file.mimetype;
    // if(!acceptedCSVTSVMimeTypes.includes(mimeType)) {
    //     res.statusCode = 400;
    //     res.json({error: "Invalid file type"});
    // }

    const readStream = bufferToStream(req.file.buffer);

    const fileReadPromise = new Promise((resolve, reject) => {

        const results = [];
        const dataKeys = {};

        const uniqueKeys = {};

        readStream.pipe(csvParser({separator}))
            .on("data", (data) => {
                if(!uniqueKeys[data["1.district"]]) {
                    console.log("Adding district", data["1.district"]);
                    const newData = {org: org, hash: hash};

                    Object.keys(data).forEach((key) => {
                        let newKey = dataKeys[key] || key.replace(/[\s]/g, "_").replace(/(^[0-9]+\.)|[\(\)]/g, "");
                        if(!fieldsToAccount.includes(newKey)) {
                            return;
                        }
                        switch (newKey) {
                            case "district":
                                const cleanDistrictName = convertBackFromCamelCase(data[key]);
                                const {district = cleanDistrictName, state} = findDistrictAndStates(cleanDistrictName);
                                newData["district"] = district;
                                newData["state"] = state || district_state_map[cleanDistrictName] || null;
                                break;
                            default:
                                newData[newKey] = getNumberIfPossibleForValue(data[key], true);
                        }
                        dataKeys[key] = newKey;
                    })

                    results.push(newData);
                    uniqueKeys[data["1.district"]] = true;
                }

            }).on("end", () => {
            console.log("CSV file successfully processed", results);

            resolve(results);
        }).on("error", (error) => {
            reject(error);
        });
    });

    const parsedCSV = await fileReadPromise;
    // console.log(parsedCSV);

    const collection = db.collection(`raw-data-stats`);

    await collection.insertMany(parsedCSV);

    await metaDataCollection.insertOne({hash, org, uploadedAt: new Date()});

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