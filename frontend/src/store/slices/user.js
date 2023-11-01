import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsers,
  fetchFriends,
  fetchFriendRequests,
  fetchS3Url,
  updateMe,
} from "../thunks/user";

const initialState = {
  user: null,
  users: [],
  friends: [],
  friendRequests: [],
  chatType: null,
  callLogs: [],
  roomId: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectConversation(state, action) {
      state.roomId = action.payload.roomId;
      state.chatType = "individual";
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    logoutUser(state, action) {
      state.user = null;
      state.users = [];
      state.friends = [];
      state.friendRequests = [];
      state.chatType = null;
      state.callLogs = [];
      state.roomId = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers(builder) {
    // fetchUsers
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.users = action.payload.data;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // fetchFriends
    builder.addCase(fetchFriends.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.friends = action.payload.data;
    });
    builder.addCase(fetchFriends.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // fetchFriendRequests
    builder.addCase(fetchFriendRequests.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFriendRequests.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.friendRequests = action.payload.data;
    });
    builder.addCase(fetchFriendRequests.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // user

    // fetchS3Url
    builder.addCase(fetchS3Url.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchS3Url.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user.avatarUrl = action.payload.data;
    });
    builder.addCase(fetchS3Url.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // updateMe
    builder.addCase(updateMe.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user.avatar = action.payload.user.avatar;
      state.user.nickName = action.payload.user.nickName;
      state.user.about = action.payload.user.about;
    });
    builder.addCase(updateMe.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default userSlice.reducer;

export const { selectConversation, setUser, logoutUser } = userSlice.actions;
