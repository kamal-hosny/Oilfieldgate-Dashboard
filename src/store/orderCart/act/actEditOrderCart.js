import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";
import Cookies from "js-cookie";

// Safely handle the auth cookie
let token;
const authCookie = Cookies.get('auth');

if (authCookie) {
  try {
    token = JSON.parse(authCookie).token;
  } catch (error) {
    console.error("Error parsing auth cookie:", error);
    token = null; // Handle invalid token
  }
} else {
  console.error("Auth cookie is not available.");
  token = null; // Handle missing cookie
}

export const editOrderCart = createAsyncThunk(
  "OrderCart/editOrderCart",
  async (data, thunkApi) => {
    if (!token) {
      return thunkApi.rejectWithValue("Authentication token is missing or invalid");
    }

    try {
      const response = await axiosConfig.put(`order/cart/${data._id}`, data, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data || error.message || "An unknown error occurred";
      return thunkApi.rejectWithValue(message);
    }
  }
);
