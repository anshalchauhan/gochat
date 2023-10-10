import { createAsyncThunk } from "@reduxjs/toolkit";
// Importing axios instance from utility folder
import axios from "../../../utils/axios";

import { base64ImageToBlob } from "../../../utils/createImage";

const fetchS3Url = createAsyncThunk(
  "/user/fetchS3Url",
  async (file, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/user/s3-url", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      // Creating image form base64 string
      const data = base64ImageToBlob(file);

      // Create new S3 Url
      const avatarUrl = response?.data.data;
      await axios({
        method: "PUT",
        url: avatarUrl,
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response?.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response?.data);
    }
  }
);

export { fetchS3Url };
