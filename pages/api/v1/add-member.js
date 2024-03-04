import withValidUserOnly from "../../../src/node/with-valid-user-only";
import * as assert from "assert";
import mongodbClient from "../../../src/node/mongodb-client";

const handler = async (req, res) => {

    try{
        assert(req.method === "POST" || req.method === "PUT", "Only POST/PUT requests are accepted");
        assert(req.body.email, "Email must be provided");
        assert(req.body.role, "Role must be provided");

        try {
                await mongodbClient.connect();
                const db = mongodbClient.db("vaani");
                const membersCollection = db.collection("members");

                const member = await membersCollection.findOne({
                    email: req.body.email
                });

                if(member && req.method === "POST"){
                    res.status(400).json({message: "Member already exists. Use PUT to update"});
                    return;
                }

                if(!member && req.method === "PUT"){
                    res.status(400).json({message: "Member does not exist. Use POST to add"});
                    return;
                }

                const roles = await db.collection("roles").find().toArray();

                const role = roles.find(role => role.role === req.body.role);

                if(req.method === "POST"){
                    await membersCollection.insertOne({
                        email: req.body.email,
                        role: req.body.role,
                        level: role.level,
                        createdAt: new Date(),
                        org: req.body?.org || null,
                    });
                }
                else {
                    await membersCollection.updateOne({
                        email: req.body.email
                    }, {
                        $set: {
                            role: req.body.role,
                            level: role.level,
                            org: req.body?.org || null
                        }
                    });
                }


                res.status(200).json({message: "Success"});
                res.end();
        }
        catch (e) {
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
        res.end();
        return;
    }
}

export default withValidUserOnly(handler, 1);