// import mongodbClient from "../../../src/node/mongodb-client";
//
// const handler = async (req, res) => {
//     await mongodbClient.connect()
//
//     const db = mongodbClient.db("vaani");
//     const collection = db.collection("raw-data-stats");
//
//     await collection.deleteMany({});
//
//     res.json({message: "Deleted all raw hashes"});
//
// }
//
// export default handler;