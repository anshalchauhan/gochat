// React
import React from "react";

// MUI
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Components
import StyledBadge from "../../components/StyledBadge";

// Socket
import { socket } from "../../socket";
import { Chat } from "phosphor-react";

const userId = window.localStorage.getItem("userId");
// console.log(userId, socket);

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const ListComponent = ({
  type,
  id,
  _id,
  firstName,
  lastName,
  avatar,
  incoming,
  missed,
  online,
}) => {
  const name = `${firstName} ${lastName}`;

  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems={"center"} spacing={2}>
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={avatar} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={avatar} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          {(() => {
            switch (type) {
              case "friend_request":
                return (
                  <Button
                    onClick={() =>
                      socket?.emit(
                        "friend_request",
                        { to: _id, from: userId },
                        () => alert("request sent")
                      )
                    }
                  >
                    Send Request
                  </Button>
                );

              case "start_conversation":
                return (
                  <IconButton
                    onClick={() =>
                      socket?.emit("start_conversation", {
                        to: _id,
                        from: userId,
                      })
                    }
                  >
                    <Chat />
                  </IconButton>
                );

              case "accept_request":
                return (
                  <Button
                    onClick={() =>
                      socket?.emit("accept_request", { requestId: id }, () =>
                        alert("request accepted")
                      )
                    }
                  >
                    Accept Request
                  </Button>
                );

              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export default ListComponent;
