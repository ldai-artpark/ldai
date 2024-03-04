import {createSlice} from "@reduxjs/toolkit";


const initialData = {
    team: {
        changeRoleRequest: {
            userEmail: null,
            userRole: null,
            userOrg: null,
        },
    },
    dashPage: {
        selectedFilter: "all",
    }
};

const mainSlice = createSlice({
    name: "mainSlice",
    initialState: initialData,
    reducers: {
        setTeamChangeRoleRequest: (state, action) => {
            state.team.changeRoleRequest = action.payload;
        },
        setDashPageSelectedFilter: (state, action) => {
            state.dashPage.selectedFilter = action.payload;
        }
    },
});

export const {
    setTeamChangeRoleRequest,
    setDashPageSelectedFilter,
} = mainSlice.actions;

export default mainSlice.reducer;

