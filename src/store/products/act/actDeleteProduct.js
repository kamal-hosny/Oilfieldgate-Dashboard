import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig";
import Cookies from "js-cookie";

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, thunkAPI) => {
        try {
            const authCookie = Cookies.get('auth');

            // Check if the cookie exists and is valid JSON
            if (!authCookie) {
                throw new Error('Authentication token not found');
            }

            const { token } = JSON.parse(authCookie);

            const response = await axiosConfig.delete(`proudect/${id}`, {
                headers: {
                    "token": token
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
