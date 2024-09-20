import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";

export const getAllCategories = createAsyncThunk(
    'categories/getAllCategories',
    async (_, thunkApi) => {
        try {
            const response = await axiosConfig.get(`proudect/get/Category`)
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)