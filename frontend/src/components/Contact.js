// React
import { useState } from "react";

// MUI
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

// Phosphor React
import {
  Bell,
  CaretRight,
  Phone,
  Prohibit,
  Star,
  Trash,
  VideoCamera,
  X,
} from "phosphor-react";

// Faker
import { faker } from "@faker-js/faker";

// Custom MUI components
import AntSwitch from "./AntSwitch";
import ScrollBar from "./ScrollBar";
import AlertDialog from "./AlertDialog";

// React Redux
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar, updateSideBarType } from "./../store";

// Redux
import { setVoiceCall, setVideoCall } from "./../store";

const Contact = () => {
  // React Redux
  const dispatch = useDispatch();
  const { currentConversation } = useSelector((state) => state.chat.singleChat);
  const { img, name, msg } = currentConversation;
  const { roomId } = useSelector((state) => state.user);

  // Handling Voice and Video Calls
  const handleVoiceCall = () => {
    dispatch(
      setVoiceCall({
        voiceCall: {
          ...currentConversation,
          type: "out-going",
          callType: "voice",
          roomId,
        },
      })
    );
  };

  const handleVideoCall = () => {
    dispatch(
      setVideoCall({
        videoCall: {
          ...currentConversation,
          type: "out-going",
          callType: "video",
          roomId,
        },
      })
    );
  };

  // State to handle alert dialog
  // Block
  const [openBlock, setOpenBlock] = useState(false);

  const handleOpenBlock = () => {
    setOpenBlock(true);
  };

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };

  //Delete
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // Styles
  const headerBox = {
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
    width: "100%",
    backgroundColor: (theme) =>
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

  const contactAvatar = {
    height: 64,
    width: 64,
  };

  return (
    <>
      <Box sx={{ width: 320, height: "100vh" }}>
        <Stack sx={{ height: "100%" }}>
          {/* Header */}
          <Box sx={headerBox}>
            <Stack
              sx={headerStack}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={3}
            >
              <Typography variant="subtitle2">Contact Info</Typography>
              <IconButton
                onClick={() => {
                  dispatch(toggleSideBar());
                }}
              >
                <X />
              </IconButton>
            </Stack>
          </Box>
          {/* Body */}
          <ScrollBar className="scrollbar" sx={bodyBox}>
            <Stack p={3} spacing={3}>
              <Stack alignItems="center" direction="row" spacing={2}>
                <Avatar src={img} alt={"avatar image"} sx={contactAvatar} />
                <Stack>
                  <Typography variant="article" fontWeight={600}>
                    {`${name}`}
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-evenly"
              >
                <Stack spacing={1} alignItems="center">
                  <IconButton onClick={handleVoiceCall}>
                    <Phone />
                  </IconButton>
                  <Typography variant="overline">Voice</Typography>
                </Stack>
                <Stack spacing={1} alignItems="center">
                  <IconButton onClick={handleVideoCall}>
                    <VideoCamera />
                  </IconButton>
                  <Typography variant="overline">Video</Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack spacing={0.5}>
                <Typography variant="article">About</Typography>
                <Typography variant="body2">{msg}</Typography>
              </Stack>
              <Divider />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="subtitle2">Media, Links & Docs</Typography>
                <Button
                  onClick={() => {
                    dispatch(updateSideBarType("SHARED"));
                  }}
                  endIcon={<CaretRight />}
                >
                  401
                </Button>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                {[1, 2, 3].map((el, index) => {
                  return (
                    <Box key={index}>
                      <img
                        src={faker.image.urlLoremFlickr({ category: "food" })}
                        alt={faker.person.fullName()}
                      />
                    </Box>
                  );
                })}
              </Stack>
              <Divider />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Star size={21} />
                  <Typography variant="subtitle2">Starred Messages</Typography>
                </Stack>
                <IconButton
                  onClick={() => {
                    dispatch(updateSideBarType("STARRED"));
                  }}
                >
                  <CaretRight />
                </IconButton>
              </Stack>
              <Divider />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Bell size={21} />
                  <Typography variant="subtitle2">
                    Mute Notifications
                  </Typography>
                </Stack>
                <AntSwitch />
              </Stack>
              <Divider />
              <Typography>1 group in common</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={faker.image.avatar()}
                  alt={faker.person.fullName()}
                />
                <Stack spacing={0.5}>
                  <Typography variant="subtitle2">Pet Lovers</Typography>
                  <Typography variant="subtitle2">
                    Owl, Parrot, Rebbit, You
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button
                  onClick={handleOpenBlock}
                  startIcon={<Prohibit />}
                  fullWidth
                  variant="outlined"
                >
                  Block
                </Button>
                <Button
                  onClick={handleOpenDelete}
                  startIcon={<Trash />}
                  fullWidth
                  variant="outlined"
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </ScrollBar>
        </Stack>
      </Box>
      <AlertDialog
        open={openBlock}
        onClose={handleCloseBlock}
        dialogText="Block Contact"
        dialogContentText="Are you sure you want to block this contact"
      />
      <AlertDialog
        open={openDelete}
        onClose={handleCloseDelete}
        dialogText="Delete Contact"
        dialogContentText="Are you sure you want to delete this contact"
      />
    </>
  );
};

export default Contact;
