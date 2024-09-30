import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig";

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async (data, thunkAPI) => {
    // console.log(data);
    try {
      let query = `proudect?`;

      // Dynamically add filters based on the passed data
      if (data.modelNumber) query += `&ModelNumber=${data.modelNumber.value}`;
      if (data.condition) query += `&Condition=${data.condition.value}`;
      if (data.brand) query += `&Brand=${data.brand.value}`;
      if (data.category) query += `&Category=${data.category.value}`;
      if (data.materialCategory) query += `&materialCategory=${data.materialCategory.value}`;
      if (data.pageNumber) query += `&page=${data.pageNumber.value}`;
      if (data.search ) query += `&search=${data.search}`;
      if (data.page ) query += `&page=${data.page}`;
      if (data.limit ) query += `&limit=${data.limit || 10}`;

      const response = await axiosConfig.get(query);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
