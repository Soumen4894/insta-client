import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice"
import postReducer from "../slice/postSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer
    },
});

export default store;