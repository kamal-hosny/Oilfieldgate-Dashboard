import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig";

export const createBrand = createAsyncThunk(
    "Brands/createBrand",
    async (data, thunkApi) => {
        console.log(data);
       try {
        const response = await axiosConfig.post("proudect/post/Brand", data, {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
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