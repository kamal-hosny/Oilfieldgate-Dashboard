import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";

export const editOrderCart = createAsyncThunk(
    "OrderCart/editOrderCart",
    async (data, thunkApi) => {
        try {
            const response = await axiosConfig.put(`order/cart/${data._id}`, data, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    token:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGNjOGI2MWRhNzc3NTZmZjY5NjE5OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyNjI4Njk1M30.9n5DDs-ZARTEx9_1-Bgs_LubsSPgAeCgcIpPVh7FSxs",
                }
            })
            return response.data;
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)