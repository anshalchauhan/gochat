import { createAsyncThunk } from "@reduxjs/toolkit";
// Importing axios instance from utility folder
import axios from "../../../utils/axios";

const register = createAsyncThunk(
  "/user/register",
  async (formValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/v1/auth/register",
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

export { register };
