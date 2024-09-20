import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";

export const deleteMaterialCategory = createAsyncThunk(
    "MaterialCategories/delateMaterialCategory",
    async (id, thunkAPI) => {
        try {
            const response = await axiosConfig.delete(`proudect/delete/materialCategory/${id}`)
            if(!response.ok) {
                throw new Error('Failed to delete the post')
            }
            return id
        }
        catch (error) {
            thunkAPI.rejectWithValue(error.response.data);
        }
    }
)