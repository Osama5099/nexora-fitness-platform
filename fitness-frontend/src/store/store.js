import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import authResucer  from "./authSlice.js";
export const store= configureStore({
    reducer: {
        auth: authReducer,
    },
});