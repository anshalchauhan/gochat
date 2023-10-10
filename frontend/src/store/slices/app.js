import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // TODO: tab
  tab: 0,
  sideBar: {
    open: false,
    type: "CONTACT", // can be CONTACT, STARRED, SHARED
  },
  snackBar: {
    open: false,
    message: null,
    severity: null,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Toggle Sidebar
    toggleSideBar(state, action) {
      state.sideBar.open = !state.sideBar.open;
    },
    updateSideBarType(state, action) {
      state.sideBar.type = action.payload;
    },
    // Open and Close SnackBar
    openSnackBar(state, action) {
      state.snackBar.open = true;
      state.snackBar.message = action.payload.message;
      state.snackBar.severity = action.payload.severity;
    },
    closeSnackBar(state, action) {
      state.snackBar.open = false;
      state.snackBar.message = null;
      state.snackBar.severity = null;
    },
  },
});

export default appSlice.reducer;
export const { toggleSideBar, updateSideBarType, openSnackBar, closeSnackBar } =
  appSlice.actions;
