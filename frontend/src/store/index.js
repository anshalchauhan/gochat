//Redux/toolkit
import { configureStore } from "@reduxjs/toolkit";

//Redux Persist
import { persistStore, persistReducer } from "redux-persist";
import { rootPersistConfig, rootReducer } from "./rootReducer";

//Slice Actions

// appSlice
import {
  toggleSideBar,
  updateSideBarType,
  openSnackBar,
  closeSnackBar,
} from "./slices/app";

// authSlice
import { logout } from "./slices/auth";

// userSlice
import { selectConversation, setUser, logoutUser } from "./slices/user";

// chatSlice
import {
  fetchSingleChatConversations,
  updateSingleChatConversations,
  addSingleChatConversations,
  setSingleChatCurrentConversations,
  fetchSingleChatCurrentMessages,
  addSingleChatMessage,
  logoutChat,
} from "./slices/chat";

// callSlice
import {
  setVoiceCall,
  setVideoCall,
  endCall,
  setIncomingVoiceCall,
  setIncomingVideoCall,
} from "./slices/call";

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    });
  },
});

const persistor = persistStore(store);
export { store, persistor };
export {
  toggleSideBar,
  updateSideBarType,
  openSnackBar,
  closeSnackBar,
  logout,
  // User
  selectConversation,
  setUser,
  logoutUser,
  // Chat
  fetchSingleChatConversations,
  updateSingleChatConversations,
  addSingleChatConversations,
  setSingleChatCurrentConversations,
  fetchSingleChatCurrentMessages,
  addSingleChatMessage,
  logoutChat,
  // Call
  setVoiceCall,
  setVideoCall,
  endCall,
  setIncomingVoiceCall,
  setIncomingVideoCall,
};
export * from "./thunks/auth";
export * from "./thunks/user";
