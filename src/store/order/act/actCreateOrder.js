import { createAsyncThunk } from "@reduxjs/toolkit";
import adminToken, { axiosConfig } from "../../../services/axiosConfig";

export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (data, thunkApi) => {
        try {
            const response = await axiosConfig.post(`order`, data, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8" ,
                    token: adminToken
                },
            });
            return response.data;
        } catch (error) {
            const message =
                error.response?.data || error.message || "An unknown error";
            return thunkApi.rejectWithValue(message);
        }
    }
);
