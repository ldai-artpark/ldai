import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import userReducer from "../slices/userSlice";

const userStore = () =>
  configureStore({
    reducer: {
        userDetails: userReducer,
    },
  });

export const wrapper = createWrapper(userStore);