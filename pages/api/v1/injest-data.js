import withValidUserOnly from "../../../src/node/with-valid-user-only";
import * as assert from "assert";
import mongodbClient from "../../../src/node/mongodb-client";

const handler = async (req, res) => {

    try {
        assert(req.method === "PUT", "Only POST/PUT requests are accepted");

        const dataFunnel = req.body.dataFunnel;
        const geographicalPresenceData = req.body.geographicalPresenceData;
        const transcriptionData = req.body.transcriptionData;
        const imagesCollected = req.body.imagesCollected;

        try {
            await mongodbClient.connect();
            const db = mongodbClient.db("vaani");
            const injestedData = db.collection("datastatic");

            const updatedData = await injestedData.updateOne({"name": "staticData" } , { $set : {dataFunnel,geographicalPresenceData, transcriptionData, imagesCollected}});

            res.status(200).json({ message: "Success" });
            res.end();
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ message: "Internal Server Error" });
            res.end();
        }
        finally {
            await mongodbClient.close();
        }

    }
    catch (e) {
        res.status(400).json({ error: e.message });
        res.end();
        return;
    }
}

export default withValidUserOnly(handler, 1);