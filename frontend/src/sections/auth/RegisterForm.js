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
  Stack,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";

// Phosphor react
import { Eye, EyeSlash } from "phosphor-react";

//Styles
import { loginButton as registerButton } from "./LoginForm";

// Redux
import { register } from "../../store";

// React-Redux
import { useSelector } from "react-redux";

// Redux useThunk Hook
import useThunk from "../../hooks/useThunk";

const RegisterForm = () => {
  //State
  const [showPassword, setShowPassword] = useState(false);

  //React-Redux
  const { isLoading } = useSelector((state) => state.auth);

  // Passing register thunk in hook
  const [doRegister] = useThunk(register);

  // React Hook Form
  // Object Schema for validaiton
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("Firstname is required"),
    lastName: Yup.string().required("Lastname is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid Email Address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "demo@gochat.com",
    password: "demo123",
  };

  // yup resolver will make the object schema readable for the React hook form
  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    doRegister(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField name="firstName" label="First Name" />
          <RHFTextField name="lastName" label="Last Name" />
        </Stack>
        <RHFTextField name="email" label="Email" />
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
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={registerButton}
        >
          {isLoading ? <CircularProgress color="inherit" /> : "Create Account"}
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default RegisterForm;
