// React
import React from "react";

// MUI
import { Box, Stack, Typography, Avatar, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

// React Redux
import { useDispatch, useSelector } from "react-redux";

// Redux
import { endCall, setIncomingVoiceCall, setVoiceCall } from "../../store";

// Socket
import { socket } from "../../socket";

const IncomingVoiceCall = () => {
  // React Redux
  const dispatch = useDispatch();
  const { incomingVoiceCall } = useSelector((state) => state.call);

  const acceptCall = () => {
    dispatch(
      setVoiceCall({
        voiceCall: { ...incomingVoiceCall, type: "in-coming" },
      })
    );
    socket?.emit("accept-incoming-call", { id: incomingVoiceCall.id });
    dispatch(
      setIncomingVoiceCall({
        incomingVoiceCall: undefined,
      })
    );
  };

  const rejectCall = () => {
    socket?.emit("reject-call", { from: incomingVoiceCall.id });
    dispatch(endCall());
  };

  const callStyle = {
    backgroundColor: (theme) => theme.palette.background.paper,
    border: 2,
    borderColor: (theme) => theme.palette.primary.main,
    height: 100,
    width: 300,
    position: "fixed",
    bottom: 16,
    mb: 0,
    right: 20,
    zIndex: 1,
  };

  const StyledBox = styled(Box)(({ theme }) => ({
    "&.MuiBox-root": {
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: `10px solid ${theme.palette.primary.main}`,
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(1)",
        opacity: 0.3,
      },
      "100%": {
        transform: "scale(1.2)",
        opacity: 0,
      },
    },
  }));

  return (
    <StyledBox sx={callStyle}>
      <Stack
        sx={{ height: "100%" }}
        direction="row"
        justifyContent="flex-start"
      >
        <Stack marginLeft={2} direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{ height: 80, width: 80 }}
            alt="Caller's profile picture"
            src={incomingVoiceCall?.img}
          />
          <Stack direction="column" spacing={1}>
            <Stack>
              <Typography variant="heading3">
                {incomingVoiceCall?.name}
              </Typography>
              <Typography variant="caption">Incoming Voice Call</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button
                sx={{ zIndex: 2 }}
                variant="contained"
                size="small"
                color="success"
                onClick={acceptCall}
              >
                Accept
              </Button>
              <Button
                sx={{ zIndex: 2 }}
                variant="contained"
                size="small"
                color="error"
                onClick={rejectCall}
              >
                Reject
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </StyledBox>
  );
};

export default IncomingVoiceCall;
