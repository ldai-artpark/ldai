import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import mainReducer from "../slices/mainSlice";
import userReducer from "../slices/userSlice";

const makeStore = () =>
  configureStore({
    reducer: {
        main: mainReducer,
        userDetails: userReducer,
    },
  });

export const wrapper = createWrapper(makeStore);
