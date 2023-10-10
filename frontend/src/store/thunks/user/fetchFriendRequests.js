import { createAsyncThunk } from "@reduxjs/toolkit";
// Importing axios instance from utility folder
import axios from "../../../utils/axios";

const fetchFriendRequests = createAsyncThunk(
  "/user/fetchFriendRequests",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/user/get-friend-requests", {
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

export { fetchFriendRequests };
