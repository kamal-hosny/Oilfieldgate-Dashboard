import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";

const { token } = JSON.parse(Cookies.get('auth'))

export const createUsersOrder = createAsyncThunk(
    "UsersOrder/createUsersOrder",
    async (data, thunkApi) => {
        try {
            const response = await axiosConfig.post("order/user/create", data, {
                Headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "token": token
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

