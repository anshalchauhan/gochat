// MUI
import { Stack, Typography, Link } from "@mui/material";

// React Router Dom
import { Link as RouterLink } from "react-router-dom";

// Phosphor React
import { CaretLeft } from "phosphor-react";

// Form
import ResetPasswordForm from "../../sections/auth/ResetPasswordForm";

const ResetPassword = () => {
  // Styles
  const loginLinkStyle = {
    mt: 3,
    mx: "auto",
    alignItems: "center",
    display: "inline-flex",
  };

  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h3" paragraph>
          Forgot your Password?
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          Please enter the email address associated with your account and We
          will email you a link to reset your password.
        </Typography>
        <ResetPasswordForm />
        <Link
          component={RouterLink}
          to="/auth/login"
          color="inherit"
          variant="subtitle2"
          sx={loginLinkStyle}
        >
          <CaretLeft />
          Return to sign in
        </Link>
      </Stack>
    </>
  );
};

export default ResetPassword;
