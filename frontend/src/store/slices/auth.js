import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  register,
  verifyOTP,
  forgotPassword,
  resetPassword,
} from "../thunks/auth";

const initialState = {
  isLoggedIn: false,
  token: "",
  email: "",
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Log out reducer
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = "";
      state.email = "";
      window.localStorage.removeItem("userId");
    },
  },
  extraReducers(builder) {
    // Login
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.email = action.payload.user.email;
      state.token = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Register
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.email = action.payload.email;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Verify OTP
    builder.addCase(verifyOTP.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.email = action.payload.user.email;
      state.token = action.payload.token;
    });
    builder.addCase(verifyOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Forgot Password
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Reset Password
    builder.addCase(resetPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.email = action.payload.user.email;
      state.token = action.payload.token;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
