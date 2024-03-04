import {Readable} from "stream";
import nextConnect from "next-connect";

import _ from "lodash";
import findDistrictAndStates from "../findDistrictAndStates";

export const acceptedCSVTSVMimeTypes = ["text/plain" , "text/csv", "text/tsv", "text/tab-separated-values"];

export function bufferToStream(binary) {

    return new Readable({
        read() {
            this.push(binary);
            this.push(null);
        }
    });
}

export const uploadHandler = nextConnect({
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
    onError(error, req, res) {
        res.status(500).json({ error: `Sorry something Happened! ${error.message}` });
    }
});

export const getNumberIfPossibleForValue = (valueField, enableMinuteToHrsConversion) => {
    valueField = valueField.trim();

    if(enableMinuteToHrsConversion && /^\d+m/.test(valueField)) {
        valueField = parseInt(valueField.replace("m", ""));
        if(!isNaN(valueField)){
            return valueField / 60;
        }
    }

    const numberIfPossible = _.toNumber(valueField);

    return isNaN(numberIfPossible) ? valueField : numberIfPossible;

}

export const cleanCsvKeys = (data, newKeys = {}) => {

    const cleanData = {state: null};
    Object.entries(data).forEach(([key, value]) => {

        const newKey = newKeys[key] || key.trim().toLowerCase().replace(/[\s]/g, "_").replace(/(^[0-9]+\.)|[\(\)]/g, "");
        newKeys[key] = newKey;

        if(newKey === "state") {
            // let state be determined from district name
            return;
        }

        cleanData[newKey] =  getNumberIfPossibleForValue(value, newKey.includes("hrs"));

        const districtAndState = findDistrictAndStates(cleanData.district);

        if(districtAndState) {
            cleanData.district = districtAndState.district;
            cleanData.state = districtAndState.state;
        }

    });

    return [cleanData, newKeys];
}