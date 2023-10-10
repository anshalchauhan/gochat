// React
import { useState } from "react";

// MUI
import {
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";

// React-hook-form, Yup, @hookform/resolvers
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Hook Form
import FormProvider from "../../components/hook-form";
import { RHFTextField } from "../../components/hook-form";

// Phosphor React
import { Eye, EyeSlash } from "phosphor-react";

// Importing Button style
import { loginButton as submitButton } from "./LoginForm";

// Redux
import { resetPassword } from "../../store";

// React-Redux
import { useSelector } from "react-redux";

// Redux useThunk Hook
import useThunk from "../../hooks/useThunk";

// React-Router-Dom
import { useSearchParams } from "react-router-dom";

const NewPasswordForm = () => {
  // State
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //React-Redux
  const { isLoading } = useSelector((state) => state.auth);

  // Passing resetPassword thunk in hook
  const [doResetPassword] = useThunk(resetPassword);

  // React-Router-Dom
  const [queryParameters] = useSearchParams();

  // Object schema for form validation
  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    passwordConfirm: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });

  //Default Values
  const defaultValues = {
    password: "",
    passwordConfirm: "",
  };

  // Creating form
  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  // Methods to handle form
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    doResetPassword({ formValues: data, token: queryParameters.get("token") });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <RHFTextField
          name="password"
          label="New Password"
          type={showNewPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></RHFTextField>
        <RHFTextField
          name="passwordConfirm"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></RHFTextField>
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={submitButton}
        >
          {isLoading ? <CircularProgress color="inherit" /> : "Submit"}
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default NewPasswordForm;
