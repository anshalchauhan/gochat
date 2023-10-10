import { createAsyncThunk } from "@reduxjs/toolkit";
// Importing axios instance from utility folder
import axios from "../../../utils/axios";

const login = createAsyncThunk(
  "/user/login",
  async (formValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/v1/auth/login",
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
      return rejectWithValue(err?.response?.data);
    }
  }
);

export { login };
