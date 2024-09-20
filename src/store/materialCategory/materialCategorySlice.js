import { createSlice } from "@reduxjs/toolkit"; 
import { getAllMaterialCategories } from "./act/actGetAllMaterialCategories";   
import { createMaterialCategory } from "./act/actCreateMaterialCategory";
import { deleteMaterialCategory } from "./act/actDeleteMaterialCategory"; 
import { editMaterialCategory } from "./act/actEditMaterialCategory";
import { getOneMaterialCategory } from "./act/actGetOneMaterialCategory"; 


const initialState = { 
    records: [],
    loading: false,
    error: null
}

const getAllMaterialCategoriesSlice = createSlice({
    name: "MaterialCategories",
    initialState,
    extraReducers: (builder) => {
        builder
        // getAllMaterialCategories
        .addCase(getAllMaterialCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllMaterialCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.records = action.payload;
        })
        .addCase(getAllMaterialCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // createMaterialCategory
        .addCase(createMaterialCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createMaterialCategory.fulfilled, (state, action) => {
            state.loading = false;
            if (Array.isArray(state.records)) {
                state.records.push(action.payload);
            } else {
                state.records = [action.payload];
            }
        })
        .addCase(createMaterialCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // deleteMaterialCategory
        .addCase(deleteMaterialCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteMaterialCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el.id !== action.payload);
        })
        .addCase(deleteMaterialCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // editMaterialCategory
        .addCase(editMaterialCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(editMaterialCategory.fulfilled, (state, action) => {
            state.loading = false;
            if (Array.isArray(state.records)) {
                const index = state.records.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.records[index] = action.payload;
                }
            }
        })
        .addCase(editMaterialCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // getOneMaterialCategory
        .addCase(getOneMaterialCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getOneMaterialCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload;
        })
        .addCase(getOneMaterialCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default getAllMaterialCategoriesSlice.reducer;