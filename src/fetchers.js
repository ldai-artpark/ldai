import axios from "axios";

export const getFetcher = async (url,config) => (await axios.get(url,config)).data;

export const addUserFetcher = async (email,role,org) => {
    return await axios.post("/api/v1/add-member",{email,role,org})
}

export const modifyUserFetcher = async (email,role,org) => {
    return await axios.put("/api/v1/add-member",{email,role,org})
}