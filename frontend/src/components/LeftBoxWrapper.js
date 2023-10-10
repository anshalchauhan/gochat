// MUI
import { Stack, Box } from "@mui/material";

const LeftBoxWrapper = ({ children, padding, spacing }) => {
  //Chat
  const chatStyle = {
    position: "relative",
    height: "100vh",
    width: 320,
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? "#F8FAFF"
        : theme.palette.background.paper,
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
  };

  return (
    <Box sx={chatStyle}>
      <Stack p={padding} spacing={spacing} direction="column" height="100%">
        {children}
      </Stack>
    </Box>
  );
};

export default LeftBoxWrapper;
