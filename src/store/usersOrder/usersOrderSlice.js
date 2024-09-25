import { createSlice } from "@reduxjs/toolkit";
import { deleteOrderUserOrder } from "./act/actDeleteOrderUserOrder";
import { getAllUsersOrders } from "./act/actGetAllUsersOrder";
import { getUserOrders } from "./act/actGetUserOrders";

const initialState = {
    records: [],
    recordsUserOrder: [], 
    loading: false,
    error: null
};

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
            state.error = action.payload || action.error.message;
        })
        // getUserOrders
        .addCase(getUserOrders.pending, (state) => {
            state.loading = true;
            state.error = null; 
        })
        .addCase(getUserOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.recordsUserOrder = action.payload;
        })
        .addCase(getUserOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
        })
        // deleteOrderUserOrder
        .addCase(deleteOrderUserOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteOrderUserOrder.fulfilled, (state, action) => {
            state.loading = false;
            
            if (Array.isArray(state.recordsUserOrder)) {
                state.recordsUserOrder = state.recordsUserOrder.filter(
                    (el) => el._id !== action.payload
                );
            }
        })
        .addCase(deleteOrderUserOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
        });
    }
});

export default getAllUsersOrderSlice.reducer;
