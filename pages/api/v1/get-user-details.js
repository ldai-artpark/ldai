import {getSession, withApiAuthRequired} from "@auth0/nextjs-auth0";
import mongodbClient from "../../../src/node/mongodb-client";

const handler = async (req, res) => {
    try{
        const session = await getSession(req, res);
        const {user} = session;

        await mongodbClient.connect();

        const db = mongodbClient.db("vaani");
        const membersCollection = db.collection("members");


        const member = await membersCollection.findOne({
            email: user.email
        });

        res.status(200).json(member);

    }
    catch (e) {
        res.status(500).json({message: "Internal Server Error"});
    }
    

}

export default withApiAuthRequired(handler);