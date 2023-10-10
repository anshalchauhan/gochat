import { createAsyncThunk } from "@reduxjs/toolkit";
// Importing axios instance from utility folder
import axios from "../../../utils/axios";

const resetPassword = createAsyncThunk(
  "/user/resetPassword",
  async ({ formValues, token }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/v1/auth/reset-password/${token}`,
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

export { resetPassword };
