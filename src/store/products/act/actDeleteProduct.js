import { createAsyncThunk } from "@reduxjs/toolkit"; 
import adminToken, { axiosConfig } from "../../../services/axiosConfig";

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, thunkAPI) => {
        try {
          
            const response = await axiosConfig.delete(`proudect/${id}`, {
                headers: {
                    "token": adminToken
                }
            });
            
            if (response.status !== 200) {
                throw new Error('Failed to delete the product');
            }

            return id; 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);
