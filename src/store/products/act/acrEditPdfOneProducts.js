import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";
import Cookies from "js-cookie";

export const uploadPdfOneProducts = createAsyncThunk(
  "products/uploadPdfOneProducts",
  async (data, thunkApi) => {
    let token;
    const authCookie = Cookies.get("auth");

    // التحقق من وجود الـ Token
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
      const formData = new FormData();
      formData.append("file", data.pdf); // رفع ملف الـ PDF كـ form data

      // إرسال الطلب باستخدام FormData ورفع الملف
      const response = await axiosConfig.post(
        `proudect/upload/${data._id}`,
        formData,  // إرسال formData مباشرة
        {
          headers: {
            "Content-Type": "multipart/form-data", // ترويسة لـ FormData
            token: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      // إدارة الأخطاء وإرجاع تفاصيل الخطأ
      return thunkApi.rejectWithValue(error.response?.data || "Upload failed");
    }
  }
);
