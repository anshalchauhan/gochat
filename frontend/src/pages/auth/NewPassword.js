// MUI
import { Stack, Typography, Link } from "@mui/material";

// React Router Dom
import { Link as RouterLink } from "react-router-dom";

// Phosphor React
import { CaretLeft } from "phosphor-react";

// Form
import NewPasswordForm from "../../sections/auth/NewPasswordForm";

const NewPassword = () => {
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
          Reset Password
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          Please set your new password
        </Typography>
        <NewPasswordForm />
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

export default NewPassword;
