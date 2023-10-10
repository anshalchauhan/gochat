import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app";
import authReducer from "./slices/auth";
import userReducer from "./slices/user";
import chatReducer from "./slices/chat";
import callReducer from "./slices/call";

//slices

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  chat: chatReducer,
  call: callReducer,
});

export { rootPersistConfig, rootReducer };
