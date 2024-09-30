import { createAsyncThunk } from "@reduxjs/toolkit";
import adminToken, { axiosConfig } from "../../../services/axiosConfig";

export const getOneOrder = createAsyncThunk(
  "orders/getOneOrder",
  async (id, thunkAPI) => {
    try {
      const response = await axiosConfig.get(`order/${id}`, {
        headers: {
          token: adminToken,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data || error.message || "An unknown error occurred";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
