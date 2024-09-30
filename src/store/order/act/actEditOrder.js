import { createAsyncThunk } from "@reduxjs/toolkit";
import adminToken, { axiosConfig } from "../../../services/axiosConfig";

export const editOrder = createAsyncThunk(
  "orders/editOrder",
  async (data, thunkApi) => {
    console.log(data);
    try {
      const response = await axiosConfig.put(`order/data/${data._id}`, data, {
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
