import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig"; 
import Cookies from "js-cookie";

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (data, thunkAPI) => {

        //
        let token;
        const authCookie = Cookies.get("auth");

        if (authCookie) {
            try {
                token = JSON.parse(authCookie).token;
            } catch (error) {
                console.error("Error parsing auth cookie:", error);
                return thunkApi.rejectWithValue("Invalid auth cookie");
            }
        } else {
            console.error("Auth cookie is not available.");
            return thunkApi.rejectWithValue(
                "Authentication token is missing or invalid"
            );
        }
        try {
            const response = await axiosConfig.post("proudect", data, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    token: token,
            }
            })
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)