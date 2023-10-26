// React
import { useEffect } from "react";

// MUI
import { Stack, Typography } from "@mui/material";

// Chat Element Component
import ChatElement from "../pages/dashboard/ChatElement";

// Importing Socket
import { socket } from "../socket";

// React-Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleChatConversations } from "../store";

const userId = window.localStorage.getItem("userId");

const ChatElementDisplay = ({ type }) => {
  // React-Redux
  const dispatch = useDispatch();
  const { conversations, currentMessages } = useSelector(
    (state) => state.chat.singleChat
  );

  useEffect(() => {
    socket.emit("get_single_chat_conversations", { userId }, (data) => {
      dispatch(fetchSingleChatConversations({ conversations: data }));
    });
  }, [dispatch,currentMessages]);

  return (
    <>
      {/* <Stack spacing={2.4}>
        <Typography sx={{ color: "#676767" }} variant="subtitle2">
          Pinned
        </Typography>
        {ChatList.filter((element) => element.pinned).map((element) => {
          return <ChatElement key={element.id} {...element} />;
        })}
      </Stack> */}
      <Stack spacing={2.4}>
        <Typography sx={{ color: "#676767" }} variant="subtitle2">
          {type}
        </Typography>
        {conversations
          .filter((element) => !element.pinned)
          .map((element) => {
            return <ChatElement key={element.id} {...element} />;
          })}
      </Stack>
    </>
  );
};

export default ChatElementDisplay;
