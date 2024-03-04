import mongodbClient from "../../../src/node/mongodb-client";
import nextConnect from "next-connect";

const getOrgsHandler = nextConnect({
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
    onError(error, req, res) {
        res.status(500).json({ error: `Sorry something Happened! ${error.message}` });
    }
});


getOrgsHandler.get(async (req, res) => {

        res.json = (data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        }

        await mongodbClient.connect();
        const db = mongodbClient.db("vaani");

        const orgsCollection = db.collection("raw-hashes");
        const orgs = await orgsCollection.distinct("org");


        await mongodbClient.close();
        res.json(orgs);
});

export default getOrgsHandler;