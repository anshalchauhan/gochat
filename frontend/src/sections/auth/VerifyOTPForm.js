// React-hook-form, Yup, @hookform/resolvers
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Hook Form
import FormProvider from "../../components/hook-form";
import { RHFCodes } from "../../components/hook-form";

// MUI
import { Stack, Button, Alert, CircularProgress } from "@mui/material";

// Redux
import { verifyOTP } from "../../store/thunks/auth/verifyOTP";

// React-Redux
import { useSelector } from "react-redux";

// Redux useThunk Hook
import useThunk from "../../hooks/useThunk";

const VerifyOTPForm = () => {
  // React-Redux
  const { email, isLoading } = useSelector((state) => state.auth);

  // Passing verifyOTP thunk in hook
  const [doVerifyOTP] = useThunk(verifyOTP);

  // React Hook Form
  // Object schema for validation
  const VerifyOTPSchema = Yup.object().shape({
    code1: Yup.string().required("Code is required"),
    code2: Yup.string().required("Code is required"),
    code3: Yup.string().required("Code is required"),
    code4: Yup.string().required("Code is required"),
    code5: Yup.string().required("Code is required"),
    code6: Yup.string().required("Code is required"),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  // yup resolver will make the object schema readable for the React hook form
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifyOTPSchema),
    defaultValues,
  });

  // Methods to handle form
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    doVerifyOTP({
      email,
      otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        {/* Custom OTP Input */}
        <RHFCodes
          keyName="code"
          inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
        />
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          {isLoading ? <CircularProgress color="inherit" /> : "Verify"}
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default VerifyOTPForm;
