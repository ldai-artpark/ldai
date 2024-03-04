import {MongoClient} from "mongodb";


const mongodbClient = new MongoClient(process.env.MONGO_URI);

export default mongodbClient

// async function run() {
//     try {
//         const database = client.db('socio_net');
//         const movies = database.collection('temp_access');
//         // Query for a movie that has the title 'Back to the Future'
//         // const query = { title: 'Back to the Future' };
//         // const movie = await movies.findOne(query);
//         // console.log(movie);
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);