// React
import { useState } from "react";

// React-hook-form, Yup, @hookform/resolvers
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Hook Form
import FormProvider from "../../components/hook-form";
import { RHFTextField } from "../../components/hook-form";

// MUI
import {
  Alert,
  InputAdornment,
  Stack,
  IconButton,
  Link,
  Button,
  CircularProgress,
} from "@mui/material";

// React Router Dom
import { Link as RouterLink } from "react-router-dom";

// Phosphor React
import { Eye, EyeSlash } from "phosphor-react";

// Redux
import { login } from "../../store";

// React-Redux
import { useSelector } from "react-redux";

// Redux useThunk Hook
import useThunk from "../../hooks/useThunk";

// Using in RegisterForm as well
// Button style
export const loginButton = {
  bgcolor: "text.primary",
  color: (theme) =>
    theme.palette.mode === "light" ? "common.white" : "grey.800",
  "&:hover": {
    bgcolor: "text.primary",
    color: (theme) =>
      theme.palette.mode === "light" ? "common.white" : "grey.800",
  },
};

const LoginForm = () => {
  // State
  const [showPassword, setShowPassword] = useState(false);

  // React-Redux
  const { isLoading } = useSelector((state) => state.auth);

  // Passing login thunk in hook
  const [doLogin] = useThunk(login);

  // React Hook Form
  // Object schema for validation
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "demo@gochat.com",
    password: "demo123",
  };

  // yup resolver will make the object schema readable for the React hook form
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  // Methods to handle form
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    doLogin(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <RHFTextField name="email" label="Email address" />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          component={RouterLink}
          to="/auth/reset-password"
          variant="body2"
          color="inherit"
          underline="always"
        >
          Forgot Password?
        </Link>
      </Stack>
      <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        sx={loginButton}
      >
        {isLoading ? <CircularProgress color="inherit" /> : "Login"}
      </Button>
    </FormProvider>
  );
};

export default LoginForm;
