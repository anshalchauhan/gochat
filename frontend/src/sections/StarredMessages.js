//MUI
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

//Custom MUI components
import ScrollBar from "../components/ScrollBar";

//Phosphor React
import { CaretLeft } from "phosphor-react";

//Redux
import { useDispatch } from "react-redux";
import { updateSideBarType } from "../store";

//Message Component
import Message from "../sections/conversation/Message";

const StarredMessages = () => {
  //theme
  const theme = useTheme();

  //Redux
  const dispatch = useDispatch();

  //Styles
  const headerBox = {
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
    width: "100%",
    backgroundColor:
      theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
  };

  const headerStack = {
    height: "100%",
    p: 2,
  };

  const bodyBox = {
    height: "100%",
    position: "relative",
    flexGrow: 1,
    overflowY: "scroll",
  };

  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        {/* Header */}
        <Box sx={headerBox}>
          <Stack
            sx={headerStack}
            direction="row"
            alignItems="center"
            spacing={3}
          >
            <IconButton
              onClick={() => {
                dispatch(updateSideBarType("CONTACT"));
              }}
            >
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">Starred Messages</Typography>
          </Stack>
        </Box>
        {/* Body */}
        <ScrollBar className="scrollbar" sx={bodyBox}>
          <Stack p={3} spacing={3}>
            <Message />
          </Stack>
        </ScrollBar>
      </Stack>
    </Box>
  );
};

export default StarredMessages;
