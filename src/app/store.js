import { configureStore } from "@reduxjs/toolkit";
import modal from "../store/modal/modalSlice";
import getAllCategoriesSlice from "../store/category/categorySlice";
import getAllBrandsSlice from "../store/brand/brandSlice";
import getAllMaterialCategoriesSlice from "../store/materialCategory/materialCategorySlice";
import getAllConditionsSlice from "../store/condition/conditionSlice";
import getAllUsersOrderSlice from "../store/usersOrder/usersOrderSlice";
import getAllProductsSlice from "../store/products/productsSlice";
import getAllUsersSlice from "../store/user/userSlice";
import getAllOrderCartSlice from "../store/orderCart/orderCartSlice";
import getAllOrdersSlice from "../store/order/orderSlice";
import { postLoginAuthSliceReducer } from "../store/login/loginAuthSlice";
import cloneOrderProductSlice from "../store/cloneOrderProduct/cloneOrderProductSlice";
import getMainImgSlice from "../store/productCreateMainImg/productCreateMainImgSlice"
import getImgsSlice from "../store/productCreateImgs/productCreateImgsSlice"

export const store = configureStore({
    reducer: {
        modal,
        loginAuth: postLoginAuthSliceReducer,
        allCategories: getAllCategoriesSlice,
        allBrands: getAllBrandsSlice,
        allMaterialCategories: getAllMaterialCategoriesSlice,
        allConditions: getAllConditionsSlice,
        allUsersOrder: getAllUsersOrderSlice,
        allProducts: getAllProductsSlice,
        allUsers: getAllUsersSlice,
        AllOrderCart: getAllOrderCartSlice,
        AllOrders: getAllOrdersSlice,
        cloneOrderProduct: cloneOrderProductSlice,
        createProductMainImg: getMainImgSlice,
        createProductAllImgs: getImgsSlice
    },
});
