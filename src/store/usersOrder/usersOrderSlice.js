import { createSlice } from "@reduxjs/toolkit";
import { getAllUsersOrders } from "./act/actGetAllUsersOrder";
import { getOneOrder } from "./act/actGetOneUsersOrder";

const initialState = {
    records: [],
    record: null, 
    loading: false,
    error: null
}

const getAllUsersOrderSlice = createSlice({
    name: "getAllUsersOrder",
    initialState,
    extraReducers: (builder) => {
        builder
        // getAllUsersOrders
        .addCase(getAllUsersOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllUsersOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.records = action.payload;
        })
        .addCase(getAllUsersOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error
        })
        // getOneOrder
        .addCase(getOneOrder.pending, (state) => {
            state.loading = true;
            state.error = null; 
        })
        .addCase(getOneOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload;
        })
        .addCase(getOneOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
    }
    
})

export default getAllUsersOrderSlice.reducer