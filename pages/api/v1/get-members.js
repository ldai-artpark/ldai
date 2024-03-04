import {withApiAuthRequired} from "@auth0/nextjs-auth0";
import * as assert from "assert";
import mongodbClient from "../../../src/node/mongodb-client";


export default withApiAuthRequired(async function members(req, res) {

    try {
        assert(req.method === "GET", "Only Get requests are accepted");

        try{
            await mongodbClient.connect();
            const db = mongodbClient.db("vaani");
            const collection = db.collection("members");

            const members = await collection.find();
            const membersArray = await members.toArray();

            res.json(membersArray);
            res.end();

        }catch (e) {
            console.error(e);
            res.status(500).json({message: "Internal Server Error"});
            res.end();
        }
        finally {
            await mongodbClient.close();
        }


    }
    catch (e) {
        res.status(400).json({error: e.message});
    }
});