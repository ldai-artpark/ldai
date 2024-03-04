import {getSession, withApiAuthRequired} from "@auth0/nextjs-auth0";
import mongodbClient from "./mongodb-client";

const withValidUserOnly = (handler, requiredAccess) => {

    const newHandler = async (req, res) => {
        console.log("User already validated");
        try {

            const { user } = getSession(req, res);

            await mongodbClient.connect();
            const db= mongodbClient.db("vaani");

            const membersCollection = db.collection("members");
            const membersAvailable = await membersCollection.findOne({email: user.email});

            if(membersAvailable && membersAvailable.level <= requiredAccess){
                await handler(req, res);
            }
            else {
                res.status(403).json({message: "Insufficient access"});
            }


        }catch (e) {
            console.error(e);
            res.status(500).json({message: "Internal Server Error"});
        }

    }

    return  withApiAuthRequired(newHandler);
}

export default withValidUserOnly;