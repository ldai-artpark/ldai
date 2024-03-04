import mongodbClient from "../../../src/node/mongodb-client";


const handler = async (req, res) => {

    try {

        await mongodbClient.connect();
        const db = mongodbClient.db("vaani");

        const rawHashesCollection = db.collection("raw-hashes");
        const orgs = await rawHashesCollection.distinct("org");

        const latestHashes = [];


        // commented single query in favor of multiple queries
        // const query = { $or: Object.keys(metadata.lastHash).map(oneHash => ({hash : oneHash.hash})) }
        // const stats = await rawDataStatsCollection.find(query).toArray();

        const dataPillars = {};

        for (let i = 0; i < orgs.length; i++) {

            const hashData = (await rawHashesCollection.find({
                org: orgs[i],
            }).sort({
                uploadedAt: -1
            }).limit(1).toArray())?.[0];
            latestHashes.push(hashData.hash);

        }

        const aggregatedFields = {
            "total_speakers": {$sum: "$spks_per_district"},
            "total_duration_hrs": {$sum: "$duration_per_district_hrs"},
            // "total_duration_hrs_generic" : { $sum: "$duration_per_district_hrs_generic" },
            // "total_duration_hrs_specific" : { $sum: "$duration_per_district_hrs_specific" },
        };

        const aggregate = (await db.collection("raw-data-stats").aggregate([{
            $match: {
                hash: {$in: latestHashes},
            }
        }, {
            $group: {
                _id: null,
                ...aggregatedFields,
            }
        }]).project({_id: 0}).toArray())[0];


        const rawHashesAutomatedQC = db.collection("automated-qc-hashes");

        const autoQCDocumentCollection = db.collection(`automated-qc-stats`);

        const latestHash = (await rawHashesAutomatedQC.find().sort({
            uploadedAt: -1
        }).limit(1).toArray())?.[0];


        dataPillars["raw"] = aggregate;

        const autoQCAggregates = (await autoQCDocumentCollection.aggregate([
            {
                $match: {
                    hash: latestHash.hash
                }
            },
            {
                $group: {
                    _id: null,
                    total_duration_hrs: {
                        $sum: "$duration_hrs"
                    },
                    total_speakers: {
                        $sum: "$no_of_speakers"
                    }
                }
            }
        ]).project({_id: 0}).toArray())[0];

        dataPillars["autoqc_passed"] = autoQCAggregates;


        res.status(200).json(dataPillars);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({error: e});
    }

}

export default handler;