// MUI
import { Stack, Typography, Avatar } from "@mui/material";

// Custom MUI Components
import StyledBadge from "../../components/StyledBadge";

// Element Box Wrapper
import ElementWrapper from "../../components/ElementWrapper";

// React-Redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectConversation,
  setSingleChatCurrentConversations,
} from "../../store";

const ChatElement = ({
  id,
  userId,
  img,
  name,
  msg,
  lastMessage,
  time,
  unread,
  online,
}) => {
  //React-Redux
  const dispatch = useDispatch();
  const { roomId } = useSelector((state) => state.user);
  const selectedChatId = roomId?.toString();
  let isSelected = selectedChatId === id.toString();

  if (!selectedChatId) {
    isSelected = false;
  }

  return (
    <ElementWrapper
      onClick={() => {
        dispatch(selectConversation({ roomId: id }));
        dispatch(
          setSingleChatCurrentConversations({
            id,
            userId,
            img,
            name,
            msg,
            time,
            unread,
            online,
          })
        );
      }}
      isSelected={isSelected}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">
              {lastMessage?.length > 24
                ? `${lastMessage?.slice(0, 24)}...`
                : lastMessage}
            </Typography>
          </Stack>
        </Stack>
        <Stack height={40} alignItems="flex-start" spacing={2}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {time}
          </Typography>
          {/* <Badge color="primary" badgeContent={unread} /> */}
        </Stack>
      </Stack>
    </ElementWrapper>
  );
};

export default ChatElement;
