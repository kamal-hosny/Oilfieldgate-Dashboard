import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    componentName: null,
    product: null,
    type: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            // Handle if payload is a string or an object
            if(typeof action.payload === 'string') {
                state.componentName = action.payload
                state.product = null // Clear product when only componentName is passed
                state.type = null
            } else {
                state.componentName = action.payload?.name || null;
                state.product = action.payload?.product || null;
                state.type = action.payload?.type || null;
            }
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.componentName = null;
            state.product = null
            state.type = null
        }
    }
})

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
