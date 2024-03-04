import * as assert from "assert";
import axios from "axios";

const handler = async (req, res) => {

    assert(req.method === "GET", "Only GET requests are accepted");

    try {
        const data = await axios.post(`${process.env.DATAHOSTING_URL}/api/getDynammicData`)
        console.log(data);
        res.status(200).JSON(data)
    }
    catch (e) {
        console.log("Error fetching data from ")
    }
}

export default handler;