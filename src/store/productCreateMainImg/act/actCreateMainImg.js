import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig";
import Cookies from 'js-cookie';  

export const createMainImg = createAsyncThunk(
    "products/createMainImg",
    async (data, thunkAPI) => {
        
        let token;
        const authCookie = Cookies.get("auth");

        if (authCookie) {
            try {
                token = JSON.parse(authCookie).token;
            } catch (error) {
                console.error("Error parsing auth cookie:", error);
                return thunkAPI.rejectWithValue("Invalid auth cookie");
            }
        } else {
            console.error("Auth cookie is not available.");
            return thunkAPI.rejectWithValue("Authentication token is missing or invalid");
        }

        try {
            const response = await axiosConfig.post(`proudect/update/mainimg/${data.id}`, data.mainImg, {
                headers: {
                    token: token,
                },
            });
            return response.data;
            
        } catch (error) {
            console.error("Error during API request:", error);
            return thunkAPI.rejectWithValue(error.response?.data || "Error updating main image");
        }
    }
);
