import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig";

export const createMaterialCategory = createAsyncThunk(
    "Categories/createMaterialCategory",
    async (data, thunkApi) => {
        try {
            const response = await axiosConfig.post("proudect/post/materialCategory", data, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            return response.data;
        } catch (error) {
            // Improved error handling
            const message = error.response?.data || error.message || "An unknown error occurred";
            return thunkApi.rejectWithValue(message);
        }
    }
);
