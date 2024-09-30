import { createAsyncThunk } from "@reduxjs/toolkit";
import adminToken, { axiosConfig } from "../../../services/axiosConfig";


export const createUsersOrder = createAsyncThunk(
    "UsersOrder/createUsersOrder",
    async (data, thunkApi) => {
        try {
            const response = await axiosConfig.post("order/user/create", data, {
                Headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "token": adminToken
                }
            }) 
            return response.data
        }
        catch (error) {
            const message = error.response?.data || error.message || "An unknown error occurred";
            return thunkApi.rejectWithValue(message);
        }
    }
)

