import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";
import Cookies from "js-cookie";

export const getOneOrder = createAsyncThunk(
  "orders/getOneOrder",
  async (id, thunkAPI) => {
    
    //
    let token; 
    const authCookie = Cookies.get('auth');
    if (authCookie) {
      try {
        token = JSON.parse(authCookie).token;
      } catch (error) {
        console.error("Error parsing auth cookie:", error);
        return thunkApi.rejectWithValue("Invalid auth cookie");
      }
    } else {
      console.error("Auth cookie is not available.");
      return thunkApi.rejectWithValue("Authentication token is missing or invalid");
    }


    try {
      const response = await axiosConfig.get(`order/${id}`, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data || error.message || "An unknown error occurred";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
