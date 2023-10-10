// MUI
import { Button, Stack, Alert, CircularProgress } from "@mui/material";

// React-hook-form, Yup, @hookform/resolvers
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Hook Form
import FormProvider from "../../components/hook-form";
import { RHFTextField } from "../../components/hook-form";

// Importing Button style
import { loginButton as sendRequestButton } from "./LoginForm";

// Redux
import { forgotPassword } from "../../store";

// React-Redux
import { useSelector } from "react-redux";

// Redux useThunk Hook
import useThunk from "../../hooks/useThunk";

const ResetPasswordForm = () => {
  // React-Redux
  const { isLoading } = useSelector((state) => state.auth);

  // Passing forgotPassword thunk in hook
  const [doForgotPassword] = useThunk(forgotPassword);

  // Object schema for form validation
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  //Default Values
  const defaultValues = {
    email: "",
  };

  // Creating form
  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  // Methods to handle form
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    doForgotPassword(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <RHFTextField name="email" label="Email Address"></RHFTextField>
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={sendRequestButton}
        >
          {isLoading ? <CircularProgress color="inherit" /> : "Send Request"}
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default ResetPasswordForm;
