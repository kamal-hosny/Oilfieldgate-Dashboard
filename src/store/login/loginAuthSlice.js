import { createSlice } from "@reduxjs/toolkit";
import { loginAuth } from "./act/actPostLoginAuth";
import Cookies from "js-cookie";

const initialState = {
    user: null,
    isAuthenticated: true,
    loading: false,
    error: null,
};

// Redux slice for handling login state
const postLoginAuthSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            Cookies.remove("auth"); 
        },
        loadUserFromCookies: (state) => {
            const authCookie = Cookies.get("auth"); 
            if (authCookie) {
                const authData = JSON.parse(authCookie);
                if (authData?.test) {
                    state.user = authData?.test; 
                    state.isAuthenticated = true;
                } else {
                    state.isAuthenticated = false; 
                }
            } else {
                state.isAuthenticated = false; 
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAuth.fulfilled, (state, action) => {
                state.loading = false;
                const authData = action.payload?.test;
                if (authData) {
                    state.user = authData; 
                    state.isAuthenticated = true;
                    Cookies.set('auth', JSON.stringify(action.payload)); 
                }
            })
            .addCase(loginAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    }
});


export const { logout, loadUserFromCookies } = postLoginAuthSlice.actions;
export const postLoginAuthSliceReducer = postLoginAuthSlice.reducer;
