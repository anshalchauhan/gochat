// React
import { useCallback } from "react";
// React Redux
import { useDispatch } from "react-redux";
// Redux
import { openSnackBar, setUser } from "../store";

// React-Router-Dom
import { useNavigate } from "react-router-dom";

function useThunk(thunk) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const runThunk = useCallback(
    (data) => {
      dispatch(thunk(data))
        .unwrap()
        .then((res) => {
          dispatch(
            openSnackBar({
              message: res.message,
              severity: "success",
            })
          );
          if (res?.message === "OTP Sent Successfully!")
            navigate("/auth/verify-otp");

          if (res?.user) {
            window.localStorage.setItem("userId", res.user._id);
            // Setting user details
            dispatch(setUser(res?.user));
          }
          // TODO: remove log
        })
        .catch((err) => {
          dispatch(
            openSnackBar({
              message: err.message,
              severity: "error",
            })
          );
          console.log(err);
        });
    },
    [dispatch, thunk]
  );

  return [runThunk];
}

export default useThunk;
