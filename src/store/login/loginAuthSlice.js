import { createSlice } from "@reduxjs/toolkit";
import { loginAuth } from "./act/actPostLoginAuth";
import Cookies from "js-cookie";

const initialState = {
    user: null,
    isAuthenticated: false,
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
            Cookies.remove("auth"); // Remove auth cookie
        },
        loadUserFromCookies: (state) => {
            const authCookie = Cookies.get("auth"); // Get auth data from cookies
            if (authCookie) {
                const authData = JSON.parse(authCookie);
                state.user = authData?.test; // Assuming user data is inside 'test'
                state.isAuthenticated = true;
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
                    state.user = authData; // Set user data
                    state.isAuthenticated = true;
                    Cookies.set('auth', JSON.stringify(action.payload)); // Save user data in cookies
                }
            })
            .addCase(loginAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    }
});

// Export actions and reducer
export const { logout, loadUserFromCookies } = postLoginAuthSlice.actions;
export const postLoginAuthSliceReducer = postLoginAuthSlice.reducer;
