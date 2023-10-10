// React
import { useState } from "react";

// Style Wrapper
import LeftBoxWrapper from "../../components/LeftBoxWrapper";

// MUI
import { IconButton, Stack, Box, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import ProfileForm from "../../sections/settings/ProfileForm";

const Profile = () => {
  return (
    <>
      <LeftBoxWrapper padding={4} spacing={5}>
        <Stack direction="row" alignItems="center" spacing={3}></Stack>
        Header
        <Stack direction="row" alignItems="center" spacing={3}>
          <IconButton>
            <CaretLeft size={24} color="#4B4B4B" />
          </IconButton>
          <Typography variant="h5">Profile</Typography>
        </Stack>
        {/* Profile Form */}
        <ProfileForm />
      </LeftBoxWrapper>
    </>
  );
};

export default Profile;
