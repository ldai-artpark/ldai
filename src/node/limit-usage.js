// noinspection ExceptionCaughtLocallyJS

import mongodbClient from "./mongodb-client";
import jwt from "jsonwebtoken";
import requestIp from "request-ip";
import isLocalhost from "is-localhost-ip";
import {v4 as uuidV4} from "uuid";
import moment from "moment";

const expiryTime = new Date(Math.floor(Date.now() + 1000 * 60 * 60 * 24)); // 1 days

export const MAX_TOKEN_PER_IP = 5;
export const MAX_USAGE_PER_TOKEN = 10;


const isLocalhostBlocked = process.env.BLOCK_LOCALHOST === "true";

const database = mongodbClient.db('socio_net');
const tempAccess = database.collection('temp_access');


const isInIpUsageLimit = async (ip) => {
    await mongodbClient.connect();
    const query = {ip: ip};
    const tempAccessData = await tempAccess.findOne(query);
    await mongodbClient.close();
    return !tempAccessData || tempAccessData.usageCount < MAX_TOKEN_PER_IP;

}

const sendOverUsageError = (res, errorMessages) => {
    res.status(429).json({error: errorMessages});
    res.end();
}

const updateIpUsageCount = async (ip) => {
    await mongodbClient.connect();
    const query = {ip: ip};
    const tempAccessData = await tempAccess.findOne(query);

    if(tempAccessData){
        await tempAccess.updateOne(query, {$inc: {usageCount: 1}});
    }
    else{
        await tempAccess.insertOne({ip: ip, usageCount: 1, createdAt: new Date().toUTCString()});
    }

    await mongodbClient.close();
}

const createAndSendToken = async (ip, res, initialCount = 0) => {
    await updateIpUsageCount(ip);

    const token = jwt.sign(
        {
            user: uuidV4(),
            usageCount: initialCount,
            ip: ip
        },
        process.env.JWT_SECRET,
        {},
        undefined);

    res.setHeader('Set-Cookie', `auth=${token}; path=/; expires=${expiryTime.toUTCString()}; HttpOnly`);

}

const updateTokenUsageCount = async (token,ip,res) => {

    const newPayload = {
        user: token.user,
        usageCount: token.usageCount + 1,
        ip: ip
    }

    const newToken = jwt.sign(newPayload,
        process.env.JWT_SECRET,
        {},
        undefined);


    res.setHeader('Set-Cookie', `auth=${newToken}; path=/; expires=${expiryTime.toUTCString()}; HttpOnly`);

}

const limitUsage = (wrappedFunction) => async (req, res) => {

    try {

        const cookie = req.cookies['auth'];
        const detectedIp = requestIp.getClientIp(req);


        if (await isLocalhost(detectedIp)) {
            // Bypass the limit for localhost
            if(isLocalhostBlocked) {
                console.log("Localhost is blocked");
                res.status(403).json({error: "Localhost detected, access denied."});
                return
            }
            else {
                console.log("Localhost detected, bypassing limit");
                return wrappedFunction(req, res);
            }
        }

        if (!cookie) {
            console.log("No cookie found");

            if(await isInIpUsageLimit(detectedIp)){
                console.log("In ip limit, Creating new token");
                await createAndSendToken(detectedIp, res);
            }
            else{
                console.log("Over ip limit, sending error");
                sendOverUsageError(res, "Sorry usage limit exceeded, Please join waitlist for full access.");
                return;
            }

            wrappedFunction(req, res);

        }

        console.log("Cookie found");


        try {
            const tokenDecoded = jwt.verify(cookie, process.env.JWT_SECRET, undefined, undefined);

            console.log("Token verified","usageCount:", tokenDecoded.usageCount);

            if(tokenDecoded.usageCount >= MAX_USAGE_PER_TOKEN){
                sendOverUsageError(res, `Sorry token limit exceeded, Please try again after ${moment(expiryTime).fromNow()}.`);
                return;
            }

            if (tokenDecoded.ip !== detectedIp && await isInIpUsageLimit(detectedIp)) {
                console.log("IP mismatch");
                await createAndSendToken(detectedIp, res, tokenDecoded.usageCount + 1);
            }

            await updateTokenUsageCount(tokenDecoded, detectedIp, res);
            wrappedFunction(req, res);
        }
        catch (e) {
            // Invalid token
            console.log("Invalid token");
            try {
                if (await isInIpUsageLimit(detectedIp)) {
                    await createAndSendToken(detectedIp, res);
                } else {
                    sendOverUsageError(res, "Sorry usage limit exceeded, Please join waitlist for full access.");
                }
            }
            catch (e) {
                console.log(e);
                res.status(500).json({error: e.message});
                return;
            }

        }

    }
    catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
        res.end();
    }
    finally {
        await mongodbClient.close();
    }

}


export default limitUsage;