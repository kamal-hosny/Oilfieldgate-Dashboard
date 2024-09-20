import { createSlice } from "@reduxjs/toolkit"; 
import { getAllConditions } from "./act/actGetAllConditions";   
import { createCondition } from "./act/actCreateCondition";
import { deleteCondition } from "./act/actDeleteCondition"; 
import { editCondition } from "./act/actEditCondition";
import { getOneCondition } from "./act/actGetOneCondition"; 


const initialState = { 
    records: [],
    loading: false,
    error: null
}

const getAllConditionsSlice = createSlice({
    name: "Conditions",
    initialState,
    extraReducers: (builder) => {
        builder
        // getAllConditions
        .addCase(getAllConditions.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllConditions.fulfilled, (state, action) => {
            state.loading = false;
            state.records = action.payload;
        })
        .addCase(getAllConditions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // createCondition
        .addCase(createCondition.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createCondition.fulfilled, (state, action) => {
            state.loading = false;
            if (Array.isArray(state.records)) {
                state.records.push(action.payload);
            } else {
                state.records = [action.payload];
            }
        })
        .addCase(createCondition.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // deleteCondition
        .addCase(deleteCondition.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteCondition.fulfilled, (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el.id !== action.payload);
        })
        .addCase(deleteCondition.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // editCondition
        .addCase(editCondition.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(editCondition.fulfilled, (state, action) => {
            state.loading = false;
            if (Array.isArray(state.records)) {
                const index = state.records.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.records[index] = action.payload;
                }
            }
        })
        .addCase(editCondition.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // getOneCondition
        .addCase(getOneCondition.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getOneCondition.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload;
        })
        .addCase(getOneCondition.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default getAllConditionsSlice.reducer;