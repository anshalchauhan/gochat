// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// Custom Component Snackbar
import MuiSnackBar from "./components/MuiSnackBar";
import { useSelector } from "react-redux";

function App() {
  const { open } = useSelector((state) => state.app.snackBar);

  return (
    <>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
      {open && <MuiSnackBar />}
    </>
  );
}

export default App;
