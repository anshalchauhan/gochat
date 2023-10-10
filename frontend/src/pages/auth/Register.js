// MUI
import { Stack, Typography, Link } from "@mui/material";

// React Router Dom
import { Link as RouterLink } from "react-router-dom";

// Form
import RegisterForm from "../../sections/auth/RegisterForm";

// Authorization
import AuthSocial from "../../sections/auth/AuthSocial";

const Register = () => {
  //Styles
  const termsAndConditionStyle = {
    color: "text.secondary",
    mt: 3,
    typography: "caption",
    textAlign: "center",
  };

  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Get Started With GoChat</Typography>
        <Stack direction={"row"} spacing={0.5}>
          <Typography variant="body2">Already have an account?</Typography>
          <Link component={RouterLink} to="/auth/login" variant="subtitle2">
            Sign in
          </Link>
        </Stack>

        {/* Register Form */}
        <RegisterForm />
        <Typography component={"div"} sx={termsAndConditionStyle}>
          {"By signing up, I agree to "}
          <Link underline="always" color="text.primary">
            Terms of service
          </Link>
          {" and "}
          <Link underline="always" color="text.primary">
            Privacy Policy
          </Link>
        </Typography>
        <AuthSocial />
      </Stack>
    </>
  );
};

export default Register;
