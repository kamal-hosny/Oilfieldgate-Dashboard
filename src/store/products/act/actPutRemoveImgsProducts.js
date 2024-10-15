import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";
import Cookies from "js-cookie"; // تأكد من استيراد مكتبة Cookies

export const putRemoveImgsProducts = createAsyncThunk(
    "products/putRemoveImgsProducts",
    async (data, thunkAPI) => {
        console.log(data);

        // جلب الـ token من الـ cookie
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

        // تنفيذ الطلب لإزالة الصورة
        try {
            const response = await axiosConfig.put(
                `proudect/pull/imgs/${data._id}`,
                { publicid: data.publicid }, // publicid داخل Object
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        token: token,
                    },
                }
            );

            console.log(response);

            if (response.status !== 200) {
                console.error("Failed to remove the image:", response.data);
                throw new Error("Failed to remove the image");
            }

            console.log("Response:", response.data);
            return data.publicid;
        } catch (error) {
            console.error("Error during request:", error);
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);
