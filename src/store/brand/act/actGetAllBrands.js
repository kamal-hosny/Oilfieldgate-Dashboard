import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";

export const getAllBrands = createAsyncThunk(
    'brands/getAllBrands',
    async (_, thunkApi) => {
        try {
            const response = await axiosConfig.get(`proudect/get/Brand`)
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)