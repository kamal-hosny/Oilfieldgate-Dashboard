import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig"; 

export const getOneUser = createAsyncThunk(
    "users/getOneUser",
    async (id, thunkApi) => {
        try {
            const response = await axiosConfig.get(`user/${id}`);
            return response.data;
        } catch (error) {
            const message = error.response?.data || error.message || "An unknown error occurred";
            return thunkApi.rejectWithValue(message);
        }
    }
);
