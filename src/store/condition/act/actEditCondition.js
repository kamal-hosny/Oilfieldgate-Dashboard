import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig";

export const editCondition = createAsyncThunk(
    "conditions/editCondition",
    async (data, thunkApi) => {
        try {
            const response = await axiosConfig.put(`proudect/put/Condition/${data.id}`, data, {
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