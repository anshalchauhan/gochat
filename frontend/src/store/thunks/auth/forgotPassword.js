import { createAsyncThunk } from "@reduxjs/toolkit";
// Importing axios instance from utility folder
import axios from "../../../utils/axios";

const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (formValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "api/v1/auth/forgot-password",
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

export { forgotPassword };
