import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "./act/actGetAllProducts";
import { deleteProduct } from "./act/actDeleteProduct";
import { editProduct } from "./act/actEditProduct";
import { getOneProduct } from "./act/actGetOneProduct";
import { createProduct } from "./act/actCreateProduct";
import { uploadPdfOneProducts } from "./act/acrEditPdfOneProducts";
import { putRemoveImgsProducts } from "./act/actPutRemoveImgsProducts";


const initialState = {
  records: [],
  loading: false,
  error: null,
  record: null,
  editPdf: null,
  imgs: null
};

const getAllProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanRecord: (state) => {
      state.record = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllProducts
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createProduct
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.records)) {
          state.records.push(action.payload); // Ensure state.records is an array before push
        } else {
          state.records = [action.payload]; // Fallback if state.records is not an array
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.records)) {
          state.records = state.records.filter(
            (el) => el._id !== action.payload
          );
        } else {
          state.records = []; // fallback if state.records is not an array
        }
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // editProduct
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.records)) {
          const index = state.records.findIndex(
            (product) => product._id === action.payload._id
          );
          if (index !== -1) {
            state.records[index] = action.payload;
          }
        } else {
          state.records = [action.payload]; // Fallback to ensure records is always an array
        }
      })

      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getOneProduct
      .addCase(getOneProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.record = action.payload;
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // uploadPdfOneProducts (newly added)
      .addCase(uploadPdfOneProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadPdfOneProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.editPdf = action.payload; // save the edited PDF product
      })
      .addCase(uploadPdfOneProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // putRemoveImgsProducts
      .addCase(putRemoveImgsProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putRemoveImgsProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (state.record && state.record.images) {
          const { publicid } = action.payload; // Get the image's publicid
          if (publicid) {
            // Filter out the removed image from the record's images array
            state.record.images = state.record.images.filter(
              (image) => image.publicid !== publicid
            );
          }
        }
      })
      
      .addCase(putRemoveImgsProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to remove image. Try again.";
      })
      

  },
});


export const { cleanRecord } = getAllProductsSlice.actions;
export default getAllProductsSlice.reducer;