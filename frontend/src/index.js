import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// contexts
import SettingsProvider from "./contexts/SettingsContext";

//Redux
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

//Redux-Persist
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SettingsProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SettingsProvider>
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  </React.StrictMode>
);
