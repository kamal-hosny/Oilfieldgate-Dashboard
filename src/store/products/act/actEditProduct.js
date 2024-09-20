import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";

export const editProduct = createAsyncThunk(
    'products/editProduct', 
    async (data, thunkApi) => {
        try {
            const response = await axiosConfig.put(`proudect/update/data//${data._id}`, data, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            })
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)