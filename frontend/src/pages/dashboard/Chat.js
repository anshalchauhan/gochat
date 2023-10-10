import { useState } from "react";
import { IconButton, Stack, Typography, Divider } from "@mui/material";
import { CircleDashed, Users } from "phosphor-react";

// Components
import SearchBar from "../../components/SearchBar";
import ScrollBar from "../../components/ScrollBar";

// Dialog
import Friends from "../../sections/friends/Friends";

// Style Wrapper
import LeftBoxWrapper from "../../components/LeftBoxWrapper";

// Element Type Display
import ChatElementDisplay from "../../components/ChatElementDisplay";
import CallElementDisplay from "../../components/CallElementDisplay";

const Chat = ({ heading, type, option, elementType }) => {
  // State to manage Friends Dialog
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <LeftBoxWrapper padding={3} spacing={2}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5">{heading}</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                onClick={() => {
                  handleOpenDialog();
                }}
              >
                <Users />
              </IconButton>
              <IconButton>
                <CircleDashed />
              </IconButton>
            </Stack>
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <SearchBar />
          </Stack>
          <Stack spacing={1}>
            {option}
            <Divider />
          </Stack>
        </Stack>
        <ScrollBar
          className="scrollbar"
          sx={{ flexGrow: 1, height: "100%", overflowY: "scroll" }}
        >
          <Stack spacing={2} direction="column">
            {(() => {
              switch (elementType) {
                case "Chat":
                  // Contacts or Groups
                  return <ChatElementDisplay type={type} />;

                case "Call":
                  // Calls
                  return <CallElementDisplay />;

                default:
                  break;
              }
            })()}
          </Stack>
        </ScrollBar>
      </LeftBoxWrapper>
      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Chat;
