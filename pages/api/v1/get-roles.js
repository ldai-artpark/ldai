import * as assert from "assert";
import mongodbClient from "../../../src/node/mongodb-client";


async function roles(req, res) {

    try {
        assert(req.method === "GET", "Only Get requests are accepted");

        try{
            await mongodbClient.connect();
            const db = mongodbClient.db("vaani");
            const collection = db.collection("roles");

            const roles = await collection.find();
            const rolesArray = await roles.toArray();

            const toSendRoles = rolesArray.map(role => ({name: role.name, role: role.role}));

            res.json(toSendRoles);
            res.end();

        }catch (e) {
            console.error(e);
            res.status(500).json({message: "Internal Server Error"});
            res.end();
        }


    }
    catch (e) {
        res.status(400).json({error: e.message});
    }
};

// export default withApiAuthRequired(roles);
export default roles;