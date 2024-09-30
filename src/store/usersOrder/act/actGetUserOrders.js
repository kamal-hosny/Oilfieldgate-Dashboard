import { createAsyncThunk } from "@reduxjs/toolkit"; 
import adminToken, { axiosConfig } from "../../../services/axiosConfig";

export const getUserOrders = createAsyncThunk(
    "UserOrders/getAllUsersOrder",
    async (id, thunkApi) => {
        try {
            const response = await axiosConfig.get(`order/user/${id}`, {
                headers: {
                    token: adminToken
                }
            })
            return response.data
        }
                
        catch {
            const message = error.response?.data || error.message || "An unknown error occurred";
            return thunkApi.rejectWithValue(message);
        }
        }
    
)