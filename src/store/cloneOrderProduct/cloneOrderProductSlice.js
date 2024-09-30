import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    orderData: null, 
}

const cloneOrderProductSlice = createSlice({
    name: 'cloneOrderProduct', 
    initialState,
    reducers: {
      setCloneOrderData: (state, action) => { 
        state.orderData = action.payload;
      },
      updateQuantity: (state, action) => {
        const { id, newQuantity } = action.payload;
        state.orderData = state.orderData.map((item) => {
          if (item._id === id) {
            return { ...item, Quantity: newQuantity };
          }
          return item;
        });
      },
      removeItem: (state, action) => {
        const id = action.payload;
        state.orderData = state.orderData.filter((item) => item._id !== id);
      },
      addItem: (state, action) => {
        const newItem = action.payload;
        if(!state.orderData) {
          state.orderData = [newItem];
        } else {
          state.orderData.push(newItem);
        }
      }
    },
  });
  
export const { setCloneOrderData, updateQuantity, removeItem, addItem } = cloneOrderProductSlice.actions;
export default cloneOrderProductSlice.reducer;
