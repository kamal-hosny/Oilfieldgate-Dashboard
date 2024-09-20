import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig";

export const getOneOrder = createAsyncThunk(
    "UsersOrder/getAllUsersOrder",
    async (data, thunkApi) => {
        try {
            const response = await axiosConfig.get(`order/user/${data.id}`)
            return response.data
        }
                
        catch {
            const message = error.response?.data || error.message || "An unknown error occurred";
            return thunkApi.rejectWithValue(message);
        }
        }
    
)