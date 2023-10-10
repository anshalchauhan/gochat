import React from "react";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import StyledBadge from "../../components/StyledBadge";
import { MagnifyingGlass, Phone, VideoCamera, CaretDown } from "phosphor-react";

//Redux
import { useDispatch, useSelector } from "react-redux";
//Redux Store
import { toggleSideBar } from "../../store/slices/app";

// AudioCall
import { setVoiceCall, setVideoCall } from "../../store/";

const Header = () => {
  // Redux
  const dispatch = useDispatch();
  const { currentConversation } = useSelector((state) => state.chat.singleChat);
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

  const headerStyle = {
    width: "100%",
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? "#F8FAFF"
        : theme.palette.background.paper,
    boxShadow: "0px 0px 2px rgb(0, 0, 0, 0.25)",
  };

  const headerElements = {
    width: "100%",
    height: "100%",
  };

  return (
    <Box p={2} sx={headerStyle}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={headerElements}
      >
        <Stack
          onClick={() => {
            dispatch(toggleSideBar());
          }}
          direction="row"
          spacing={2}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              alt={currentConversation?.name}
              src={currentConversation?.img}
            />
          </StyledBadge>
          <Stack spacing={0.2}>
            <Typography variant="subtitle2">
              {currentConversation?.name}
            </Typography>
            <Typography variant="caption">Online</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={3}>
          <IconButton onClick={handleVideoCall}>
            <VideoCamera />
          </IconButton>
          <IconButton onClick={handleVoiceCall}>
            <Phone />
          </IconButton>
          <IconButton>
            <MagnifyingGlass />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton>
            <CaretDown />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
