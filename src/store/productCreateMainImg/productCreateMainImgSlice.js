import { createSlice } from "@reduxjs/toolkit";
import { createMainImg } from "./act/actCreateMainImg";

const initialState = {
    record: null,
    loading: false,
    error: null,
}

const getMainImgSlice = createSlice({
    name: "mainImg",
    initialState,
    extraReducers: (builder) => {
        builder
        // createMainImg
        .addCase(createMainImg.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createMainImg.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload;
        })
        .addCase(createMainImg.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})


export default getMainImgSlice.reducer