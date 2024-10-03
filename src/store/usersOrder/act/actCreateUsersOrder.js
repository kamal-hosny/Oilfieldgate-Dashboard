import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie"; // Ensure Cookies is imported
import { axiosConfig } from "../../../services/axiosConfig";

export const createUsersOrder = createAsyncThunk(
    "UsersOrder/createUsersOrder",
    async (data, thunkApi) => {
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
            const response = await axiosConfig.post("order/user/create", data, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "token": token
                }
            });
            return response.data;
        } catch (error) {
            const message = error.response?.data || error.message || "An unknown error occurred";
            return thunkApi.rejectWithValue(message);
        }
    }
);
