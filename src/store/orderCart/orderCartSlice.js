import { createSlice } from "@reduxjs/toolkit";
import { editOrderCart } from "./act/actEditOrderCart";

const initialState = { 
    records: [],
    loading: false,
    error: null,
    record: null
}

const getAllOrderCartSlice = createSlice({
    name: "OrderCart",
    initialState,
    extraReducers: (builder) => {
        builder
        // editOrderCart
        .addCase(editOrderCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(editOrderCart.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.records.findIndex(
              (product) => product.id === action.payload.id
            );
            if (index !== -1) {
              state.records[index] = action.payload;
            }
          })
          .addCase(editOrderCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
    }
})

export default getAllOrderCartSlice.reducer