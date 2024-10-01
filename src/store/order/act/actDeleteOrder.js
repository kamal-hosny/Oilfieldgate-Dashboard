import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";
import Cookies from "js-cookie";

// Safely handle the auth cookie
const authCookie = Cookies.get('auth');
let token;

if (authCookie) {
  try {
    token = JSON.parse(authCookie).token;
  } catch (error) {
    console.error("Error parsing auth cookie:", error);
    token = null; // Set token to null or handle accordingly
  }
}

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (data, thunkApi) => {
    if (!token) {
      return thunkApi.rejectWithValue("Authentication token is missing or invalid");
    }
    
    try {
      const response = await axiosConfig.delete(`order/${data._id}`, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data || error.message || "An unknown error occurred";
      return thunkApi.rejectWithValue(message);
    }
  }
);
