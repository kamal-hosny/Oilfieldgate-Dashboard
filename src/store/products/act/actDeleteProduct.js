import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";
import Cookies from "js-cookie";

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, thunkAPI) => {
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
            const response = await axiosConfig.delete(`proudect/${id}`, {
                headers: {
                    token: token,
                },
            });

            if (response.status !== 200) {
                throw new Error("Failed to delete the product");
            }

            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);
