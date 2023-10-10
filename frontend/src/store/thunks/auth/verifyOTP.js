import { createAsyncThunk } from "@reduxjs/toolkit";
// Importing axios instance from utility folder
import axios from "../../../utils/axios";

const verifyOTP = createAsyncThunk(
  "/user/verifyOTP",
  async (formValues, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        "/api/v1/auth/verify-otp",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export { verifyOTP };
