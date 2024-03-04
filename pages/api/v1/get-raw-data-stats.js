import nextConnect from "next-connect";
import mongodbClient from "../../../src/node/mongodb-client";

const getRawDataStatsHandler = nextConnect({
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
    onError(error, req, res) {
        res.status(500).json({ error: `Sorry something Happened! ${error.message}` });
    }
})

getRawDataStatsHandler.get(async (req, res) => {
    res.json = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }

    await mongodbClient.connect();
    const db = mongodbClient.db("vaani");

    const rawHashesCollection = db.collection("raw-hashes");
    const orgs = await rawHashesCollection.distinct("org");

    const rawDataStats = {};
    const metadata = {};
    metadata.dataSize = {};
    metadata.dataSize.total = 0;

    metadata.lastHash = {};

    const latestHashes = [];


    // commented single query in favor of multiple queries
    // const query = { $or: Object.keys(metadata.lastHash).map(oneHash => ({hash : oneHash.hash})) }
    // const stats = await rawDataStatsCollection.find(query).toArray();

    const documentCollection = db.collection(`raw-data-stats`);
    for(let i = 0; i < orgs.length; i++) {

        const hashData = (await rawHashesCollection.find({
            org: orgs[i],
        }).sort({
            uploadedAt: -1
        }).limit(1).toArray())?.[0];

        metadata.lastHash[orgs[i]] = hashData;
        latestHashes.push(hashData.hash);



        const stats = (await documentCollection.find({hash: hashData.hash, org: orgs[i]}).project({_id: 0, hash: 0}).toArray()).map((stat) => ({
            id: stat.district,
            ...stat,
        }));

        metadata.dataSize[orgs[i]] = stats.length;
        metadata.dataSize.total += stats.length;
        rawDataStats[orgs[i]] = stats;
    }

    const dataAllOrgsPerDistrict = (await documentCollection.aggregate([
        {
            $match: {
                hash: {
                    $in: latestHashes
                }
            }
        },
        {
            $group: {
                _id: "$district",
                id: {$first: "$district"},
                district: {$first: "$district"},
                duration_per_district_hrs: {$sum: "$duration_per_district_hrs"},
                duration_per_district_hrs_specific: {$sum: "$duration_per_district_hrs_specific"},
                duration_per_district_hrs_generic: {$sum: "$duration_per_district_hrs_generic"},
                state: {$first: "$state"},
                spks_per_district: {$sum: "$spks_per_district"},
                files_per_district: {$sum: "$files_per_district"},
                files_per_district_specific: {$sum: "$files_per_district_specific"},
                files_per_district_generic: {$sum: "$files_per_district_generic"},
                segments_per_district: {$sum: "$segments_per_district"},
                segments_per_district_specific: {$sum: "$segments_per_district_specific"},
                segments_per_district_generic: {$sum: "$segments_per_district_generic"},
                images_per_district: {$sum: "$images_per_district"},
                images_per_district_specific: {$sum: "$images_per_district_specific"},
                images_per_district_generic: {$sum: "$images_per_district_generic"},
                lang: {$first: "$lang"},
            }
        }
    ]).project({
        _id: 0,
        org: "combined",
        id: 1,
        district: 1,
        duration_per_district_hrs: 1,
        duration_per_district_hrs_specific: 1,
        duration_per_district_hrs_generic: 1,
        state: 1,
        spks_per_district: 1,
        files_per_district: 1,
        files_per_district_specific: 1,
        files_per_district_generic: 1,
        segments_per_district: 1,
        segments_per_district_specific: 1,
        segments_per_district_generic: 1,
        images_per_district: 1,
        images_per_district_specific: 1,
        images_per_district_generic: 1,
        lang: 1,
    }).toArray());

    //
    // // also add metadata such as last updated time, numeric fields, domain of values, aggregated values, etc.
    //


    const aggregatedFields = {
        "total_speakers" : { $sum: "$spks_per_district" },
        "total_files" : { $sum: "$files_per_district" },
        "total_duration_hrs" : { $sum: "$duration_per_district_hrs" },
        "total_duration_hrs_generic" : { $sum: "$duration_per_district_hrs_generic" },
        "total_duration_hrs_specific" : { $sum: "$duration_per_district_hrs_specific" },
        "total_segments" : { $sum: "$segments_per_district" },
        "total_segments_generic" : { $sum: "$segments_per_district_generic" },
        "total_segments_specific" : { $sum: "$segments_per_district_specific" },
        // "total_images" : { $sum: "$images_per_district" },
        // "total_images_generic" : { $sum: "$images_per_district_generic" },
        // "total_images_specific" : { $sum: "$images_per_district_specific" },
    };

    const aggregate = (await db.collection("raw-data-stats").aggregate([{
        $match: {
            hash: {$in: latestHashes},
        }
    },{
        $group : {
            _id : null,
            ...aggregatedFields,
        }
    }]).project({_id: 0}).toArray())[0];

    const orgsAggregated = {};

    for(let i = 0; i < orgs.length; i++) {
        orgsAggregated[orgs[i]] = (await db.collection("raw-data-stats").aggregate([{
            $match: {
                hash: metadata.lastHash[orgs[i]].hash,
                org: orgs[i],
            }
        },{
            $group : {
                _id : null,
                ...aggregatedFields,
            }
        }]).project({_id: 0}).toArray())[0];
    }



    const stateWiseAggregatesTotal = (await db.collection("raw-data-stats").aggregate([
        {
            $match: {
                hash: {$in: latestHashes},
            }
        },
        {
            $group : {
                _id : "$state",
                id: {$first: "$state"},
                ...aggregatedFields,
            }
        },
    ]).project({_id: 0}).toArray());

    const orgWiseAggregatesTotal = {};

    for(let i = 0; i < orgs.length; i++) {
        orgWiseAggregatesTotal[orgs[i]] = (await db.collection("raw-data-stats").aggregate([
            {
                $match: {
                    hash: {$in: latestHashes},
                    org: orgs[i],
                }
            },
            {
                $group : {
                    _id : "$state",
                    org: {$first: "$org"},
                    id: {$first: "$state"},
                    ...aggregatedFields,
                }
            },
        ]).project({_id: 0}).toArray());

    }


    metadata.orgs = orgs;


    await mongodbClient.close();
    res.statusCode = 200;
    res.json({
        data : {
            ...rawDataStats,
            all: dataAllOrgsPerDistrict,
        },
        stateWiseAggregates: {
            ...orgWiseAggregatesTotal,
            all: stateWiseAggregatesTotal
        },
        aggregates: {
            ...orgsAggregated,
            all: aggregate,
        },
        metadata
    });

})

export default getRawDataStatsHandler;