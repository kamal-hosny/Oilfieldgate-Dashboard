import { createAsyncThunk } from "@reduxjs/toolkit";
import adminToken, { axiosConfig } from "../../../services/axiosConfig";

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (data, thunkApi) => {
    try {
      const response = await axiosConfig.delete(`order/${data._id}`, {
        headers: {
          token: adminToken,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data || error.message || "An unknown error occurred";
      return thunkApi.rejectWithValue(message);
    }
  }
);
