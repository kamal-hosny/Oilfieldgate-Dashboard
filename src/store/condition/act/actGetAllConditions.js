import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";

export const getAllConditions = createAsyncThunk(
    'Conditions/getAllConditions',
    async (_, thunkApi) => {
        try {
            const response = await axiosConfig.get(`proudect/get/Condition`)
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)