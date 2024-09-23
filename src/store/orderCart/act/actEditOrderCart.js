import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig";

export const editOrderCart = createAsyncThunk(
    "OrderCart/editOrderCart",
   async (data, thunkApi) => {
    try {
        const response = await axiosConfig.put(`order/data/${data.id}`, data, {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        return response.data;
    }
    catch (error) {
        return thunkApi.rejectWithValue(error.response.data)
    }
   }
)