import { createAsyncThunk } from "@reduxjs/toolkit"; 
import { axiosConfig } from "../../../services/axiosConfig";

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async (data, thunkAPI) => {
    try {
    
      let query = `proudect?limit=100`;

      // // Add the search parameter
      // if (data.term) {
      //   query += `search=${data.term}&`;
      // }

      // // Add ModelNumber parameter
      // if (data.modelNumber) {
      //   query += `ModelNumber=${data.modelNumber}&`;
      // }

      // // Add Condition parameter
      // if (data.condition) {
      //   query += `Condition=${data.condition}&`;
      // }

      // // Add Brand parameter
      // if (data.brand) {
      //   query += `Brand=${data.brand}&`;
      // }

      // // Add Category parameter
      // if (data.category) {
      //   query += `Category=${data.category}&`;
      // }

      // // Add materialCategory parameter
      // if (data.materialCategory) {
      //   query += `materialCategory=${data.materialCategory}&`;
      // }

      // // Add pagination if pageNumber is provided
      // if (data.pageNumber) {
      //   query += `page=${data.pageNumber}&`;
      // }

      // // Remove the trailing "&" if exists
      // query = query.slice(-1) === "&" ? query.slice(0, -1) : query;

      // const response = await axiosConfig.get(query);
      const response = await axiosConfig.get(query);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
