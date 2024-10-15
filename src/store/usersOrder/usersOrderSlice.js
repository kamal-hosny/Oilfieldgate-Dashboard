import { createSlice } from "@reduxjs/toolkit";
import { deleteOrderUserOrder } from "./act/actDeleteOrderUserOrder";
import { getAllUsersOrders } from "./act/actGetAllUsersOrder";
import { getUserOrders } from "./act/actGetUserOrders";
import { createUsersOrder } from "./act/actCreateUsersOrder";
import { updateStatusUserOrder } from "./act/actUpdateStatusUserOrder";
import { deleteUserOrder } from "./act/actDeleteUserOrder";

const initialState = {
    records: [],
    recordsUserOrder: [], 
    recordStatusUserOrder: "",
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
        // createUsersOrder
        .addCase(createUsersOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createUsersOrder.fulfilled, (state, action) => {
            state.loading = false;
            if (Array.isArray(state.records)) {
                state.records.push(action.payload);
            } else {
                state.records = [action.payload];
            }
        })
        .addCase(createUsersOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
        })
        //deleteUserOrder

        .addCase(deleteUserOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteUserOrder.fulfilled, (state, action) => {
            state.loading = false;
            
            if (Array.isArray(state.records)) {
                state.records = state.records.filter(
                    (el) => el._id !== action.payload
                );
            }
        })

        .addCase(deleteUserOrder.rejected, (state, action) => {
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
        })
        // updateStatusUserOrder
        .addCase(updateStatusUserOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateStatusUserOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.recordStatusUserOrder = action.payload;
        })
        .addCase(updateStatusUserOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
        });
    }
});

export default getAllUsersOrderSlice.reducer;
