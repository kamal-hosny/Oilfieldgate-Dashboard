import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";

export const getAllMaterialCategories = createAsyncThunk(
    'MaterialCategories/getAllMaterialCategories',
    async (_, thunkApi) => {
        try {
            const response = await axiosConfig.get(`proudect/get/materialCategory`)
            return response.data
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)