import nextConnect from "next-connect";
import mongodbClient from "../../../src/node/mongodb-client";
import * as assert from "assert";

const getRawHashExistence = nextConnect({
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
    onError(error, req, res) {
        res.status(500).json({ error: `Sorry something Happened! ${error.message}` });
    }
});

getRawHashExistence.get(async (req, res) => {
    res.json = (data) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
    }

    try {
        const { hash } = req.query;

        assert(hash, "Hash is required");

        await mongodbClient.connect();
        const db = mongodbClient.db("vaani");
        const collection = db.collection("raw-hashes");
        const rawHashes = await collection.findOne({hash})

        if (rawHashes) {
            res.statusCode = 200;
            console.log("Hash exists", hash);
            res.json({ message: "Hash exists" });
        }
        else {
            res.statusCode = 404;
            console.log("Hash does not exist", hash);
            res.json({ message: "Hash does not exist" });
        }

    }
    catch (e) {
        console.log(e.message);
        res.statusCode = 500;
        res.json({ message: "Internal Server Error" });
    }
});

export default getRawHashExistence;