import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig"; 

export const getOneMaterialCategory = createAsyncThunk(
    "MaterialCategories/getOneMaterialCategory",
    async (id, thunkAPI) => {
        try {
            const response = await axiosConfig.get(`api/materialCategory/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)