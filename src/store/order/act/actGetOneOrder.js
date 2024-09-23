import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig"; 

export const getOneOrder = createAsyncThunk(
    "orders/getOneOrder",
    async (id, thunkAPI) => {
        try {
            const response = await axiosConfig.get(`order/${id}`, {
                headers: {
                    token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGNjOGI2MWRhNzc3NTZmZjY5NjE5OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyNjI4Njk1M30.9n5DDs-ZARTEx9_1-Bgs_LubsSPgAeCgcIpPVh7FSxs",
                }
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data || error.message || "An unknown error occurred";
            return thunkAPI.rejectWithValue(message);
        }
    }
)