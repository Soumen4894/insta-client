import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        // user: null, // Initial state for the user
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,  
    },
    // token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;