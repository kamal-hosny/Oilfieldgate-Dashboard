import { createSlice } from "@reduxjs/toolkit"; 
import { getAllBrands } from "./act/actGetAllBrands";   
import { createBrand } from "./act/actCreateBrand";
import { deleteBrand } from "./act/actDeleteBrand"; 
import { editBrand } from "./act/actEditBrand";
import { getOneBrand } from "./act/actGetOneBrand"; 

const initialState = { 
    records: [],
    record: null, 
    loading: false,
    error: null
}

const getAllBrandsSlice = createSlice({
    name: "Brands",
    initialState,
    extraReducers: (builder) => {
        builder
        // getAllBrands
        .addCase(getAllBrands.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllBrands.fulfilled, (state, action) => {
            state.loading = false;
            state.records = action.payload;
        })
        .addCase(getAllBrands.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
        
        // createBrand
        .addCase(createBrand.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createBrand.fulfilled, (state, action) => {
            state.loading = false;
            if (Array.isArray(state.records)) {
                state.records.push(action.payload);
            } else {
                state.records = [action.payload];
            }
        })
        .addCase(createBrand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error; 
        })
        
        // deleteBrand
        .addCase(deleteBrand.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteBrand.fulfilled, (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el.id !== action.payload);
        })
        .addCase(deleteBrand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
        
        // editBrand
        .addCase(editBrand.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(editBrand.fulfilled, (state, action) => {
            state.loading = false;
            if (Array.isArray(state.records)) {
                const index = state.records.findIndex(brand => brand.id === action.payload.id);
                if (index !== -1) {
                    state.records[index] = action.payload;
                }
            }
        })
        .addCase(editBrand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
        
        // getOneBrand
        .addCase(getOneBrand.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getOneBrand.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload; // Use "record" for single brand
        })
        .addCase(getOneBrand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error; 
        });
    }
})

export default getAllBrandsSlice.reducer;
