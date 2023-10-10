import { Snackbar, Alert } from "@mui/material";
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar } from "../store";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert elevation={6} ref={ref} {...props} />;
});

const MuiSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state) => state.app.snackBar
  );

  const vertical = "bottom";
  const horizontal = "center";

  return (
    <>
      <Snackbar
        autoHideDuration={4000}
        open={open}
        onClose={() => {
          dispatch(closeSnackBar());
        }}
        key={vertical + horizontal}
        anchorOrigin={{
          vertical,
          horizontal,
        }}
      >
        <SnackbarAlert
          onClose={() => {
            dispatch(closeSnackBar());
          }}
          severity={severity}
        >
          {message}
        </SnackbarAlert>
      </Snackbar>
    </>
  );
};

export default MuiSnackbar;
