import { createAsyncThunk } from "@reduxjs/toolkit";
// Importing axios instance from utility folder
import axios from "../../../utils/axios";

const fetchFriends = createAsyncThunk(
  "/user/fetchFriends",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/user/get-friends", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      return response?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export { fetchFriends };
