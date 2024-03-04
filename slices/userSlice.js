import {createSlice} from "@reduxjs/toolkit";

const initialData = {
    user: {
        email: null,
        level: null,
        role: null,
        id: null,
        org: null
    }
};

const userSlice = createSlice({
    name: "userDetails",
    initialState: initialData,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload;
        }
    },
});

export const {
    setUserDetails,
} = userSlice.actions;

export default userSlice.reducer;
