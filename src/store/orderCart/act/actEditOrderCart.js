import { createAsyncThunk } from "@reduxjs/toolkit";
import adminToken, { axiosConfig } from "../../../services/axiosConfig";

export const editOrderCart = createAsyncThunk(
    "OrderCart/editOrderCart",
    async (data, thunkApi) => {
        try {
            const response = await axiosConfig.put(`order/cart/${data._id}`, data, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    token:
                    adminToken
                }
            })
            return response.data;
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)