import { createSlice } from "@reduxjs/toolkit";
import { createImgs } from "./act/actCreateImgs";

const initialState = {
  records: [],
  loading: false,
  error: null,
};

const getImgsSlice = createSlice({
  name: "imgs",
  initialState,
  extraReducers: (builder) => {
    builder
      // createImgs
      .addCase(createImgs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createImgs.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.records)) {
          state.records.push(action.payload);
        } else {
          state.records = [action.payload];
        }
      })
      .addCase(createImgs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getImgsSlice.reducer;
