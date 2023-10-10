import { Box, Stack, Typography } from "@mui/material";
// import React from "react";
import Contacts from "./Contacts";

// Components
import Conversation from "../../sections/conversation";
import Contact from "../../components/Contact";
import SharedMessages from "../../sections/SharedMessages";
import StarredMessages from "../../sections/StarredMessages";
import NoChat from "../../assets/Illustration/NoChat";

// React-Redux
import { useSelector } from "react-redux";

const GeneralApp = () => {
  const { sideBar } = useSelector((state) => state.app);
  const { roomId, chatType } = useSelector((state) => state.user);
  //Styles
  //Conversation
  const conversationStyle = {
    height: "100%",
    width: sideBar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? "#F0F4FA"
        : theme.palette.background.default,
  };

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Contacts />
      <Box sx={conversationStyle}>
        {roomId !== null && chatType === "individual" ? (
          <Conversation />
        ) : (
          <Stack
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
            alignItems="center"
            justifyContent="center"
          >
            <NoChat />
            <Typography variant="subtitle2">
              Select a conversation or start new one
            </Typography>
          </Stack>
        )}
      </Box>
      {sideBar.open &&
        (() => {
          switch (sideBar.type) {
            case "CONTACT":
              return <Contact />;
            case "STARRED":
              return <StarredMessages />;
            case "SHARED":
              return <SharedMessages />;
            default:
              break;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
