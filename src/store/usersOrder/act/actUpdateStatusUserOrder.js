import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";
import Cookies from "js-cookie"; // Assuming js-cookie is used for handling cookies

export const updateStatusUserOrder = createAsyncThunk(
  "UsersOrder/updateStatusUserOrder",
  async ({ id, Status }, thunkApi) => {
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
      return thunkApi.rejectWithValue("Authentication token is missing or invalid");
    }

    try {
      const response = await axiosConfig.post(
        `order/update/Status/${id}`,
         {Status} , // Passing status as an object
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            token: token,
          },
        }
      );
      console.log(response.data);
      return response.data; // Assuming we return the updated order data
    } catch (error) {
      const message = error.response?.data || error.message || "An unknown error occurred";
      return thunkApi.rejectWithValue(message);
    }
  }
);
