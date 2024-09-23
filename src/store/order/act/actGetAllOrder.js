import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig"; 

export const getAllOrders = createAsyncThunk(
    "orders/getAllOrder",
    async (_, thunkAPI) => {
        try {
            const response = await axiosConfig.get(`order`);
            return response.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)