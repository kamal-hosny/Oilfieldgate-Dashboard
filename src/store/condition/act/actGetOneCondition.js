import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig"; 

export const getOneCondition = createAsyncThunk(
    "conditions/getOneCondition",
    async (id, thunkAPI) => {
        try {
            const response = await axiosConfig.get(`api/Condition/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)