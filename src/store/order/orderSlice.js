import { createSlice } from "@reduxjs/toolkit";
import { getAllOrders } from "./act/actGetAllOrder";
import { createOrder } from "./act/actCreateOrder";
import { deleteOrder } from "./act/actDeleteOrder"
import { editOrder } from "./act/actEditOrder";
import { getOneOrder } from "./act/actGetOneOrder";

const initialState = {
    records: [],
    loading: false,
    error: null,
    record: null,
}

const getAllOrdersSlice = createSlice({
    name: "orders",
    initialState,
    extraReducers: (builder) => {
        builder
        // getAllOrders
        .addCase(getAllOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.records = action.payload;
        })
        .addCase(getAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
        // createOrder
        .addCase(createOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            if( Array.isArray(state.records)) {
                state.records.push(action.payload)
            } else {
                state.records = [action.payload]
            }
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
        // deleteOrder
        .addCase(deleteOrder.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el._id !== action.payload);
        })
        .addCase(deleteOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
        // editOrder
        .addCase(editOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(editOrder.fulfilled, (state, action) => {
            state.loading = false;
            if(Array.isArray(state.records)) {
                const index = state.records.findIndex(product.id === action.payload.id);
                if (index !== -1) {
                    state.records[index] = action.payload;
                }
            }
        })
        .addCase(editOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
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

export default getAllOrdersSlice.reducer