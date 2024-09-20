import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig"; 

export const getOneBrand = createAsyncThunk(
    "brands/getOneBrand",
    async (id, thunkAPI) => {
        try {
            const response = await axiosConfig.get(`api/Brand/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)