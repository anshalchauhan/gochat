// React
import React from "react";

// MUI
import { Box, Divider, IconButton, Stack } from "@mui/material";
import { GithubLogo, GoogleLogo, TwitterLogo } from "phosphor-react";

const AuthSocial = () => {
  //Styles
  const dividerStyle = {
    my: 2.5,
    typography: "overline",
    color: "text.disabled",
    "&::before, ::after": {
      borderTopStyle: "dashed",
    },
  };

  return (
    <Box>
      <Divider sx={dividerStyle}>OR</Divider>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <IconButton>
          <GoogleLogo color="#DF3E30" />
        </IconButton>
        <IconButton color="inherit">
          <GithubLogo />
        </IconButton>
        <IconButton>
          <TwitterLogo color="#1C9CEA" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default AuthSocial;
