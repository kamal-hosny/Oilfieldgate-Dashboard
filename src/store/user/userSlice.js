import { createSlice } from "@reduxjs/toolkit";
import { getOneUser } from "./act/actGetOneUser";

const initialState = {
    records: [],
    record: null, 
    loading: false,
    error: null
}

const getAllUsersSlice = createSlice({
    name: "getAllUsers",
    initialState,
    extraReducers: (builder) => {
        builder
        // getOneUser
        .addCase(getOneUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getOneUser.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload;
        })
        .addCase(getOneUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error
        })
    }
})

export default getAllUsersSlice.reducer