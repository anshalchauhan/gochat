import { createAsyncThunk } from "@reduxjs/toolkit";
// Importing axios instance from utility folder
import axios from "../../../utils/axios";

const fetchUsers = createAsyncThunk(
  "/user/fetchUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/user/get-users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      return response?.data;
    } catch (err) {
      console.log("yes");
      return rejectWithValue(err.response?.data);
    }
  }
);

export { fetchUsers };
