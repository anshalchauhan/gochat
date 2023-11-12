// React
import React from "react";

// MUI
import { Stack, Typography } from "@mui/material";
import VerifyOTPForm from "../../sections/auth/VerifyOTPForm";

// React-Redux
import { useSelector } from "react-redux";

const VerifyOTP = () => {
  const { email } = useSelector((state) => state.auth);
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Please Verfiy OTP</Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">{`Sent to Email (${email})`}</Typography>
        </Stack>
      </Stack>
      {/* Verify Form */}
      <VerifyOTPForm />
    </>
  );
};

export default VerifyOTP;
