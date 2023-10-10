import { createAsyncThunk } from "@reduxjs/toolkit";
// Importing axios instance from utility folder
import axios from "../../../utils/axios";

const updateMe = createAsyncThunk(
  "/user/updateMe",
  async (formValues, { getState, rejectWithValue }) => {
    try {
      const response = await axios.patch(
        "/api/v1/user/update-me",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { updateMe };
