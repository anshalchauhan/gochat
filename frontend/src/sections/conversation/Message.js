import { Box, Stack } from "@mui/material";
// import { Chat_History } from "../../data";
import {
  Timeline,
  TextMessage,
  MediaMessage,
  ReplyMessage,
  LinkMessage,
  DocumentMessage,
} from "./MessageTypes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchSingleChatCurrentMessages,
  setSingleChatCurrentConversations,
} from "../../store";
import { socket } from "../../socket";

const Message = ({ menu }) => {
  const dispatch = useDispatch();

  const { conversations, currentMessages, currentConversation } = useSelector(
    (state) => state.chat.singleChat
  );

  const { roomId } = useSelector((state) => state.user);
  const userId = window.localStorage.getItem("userId");

  useEffect(() => {
    const current = conversations.find((element) => element?.id === roomId);

    socket.emit("get_messages", { conversationId: current?.id }, (data) => {
      // console.log(data, "List of messages");
      dispatch(fetchSingleChatCurrentMessages({ userId, messages: data }));
    });

    dispatch(setSingleChatCurrentConversations(current));
  }, [currentConversation]);

  return (
    <Box p={3}>
      <Stack spacing={3}>
        {currentMessages.map((element) => {
          switch (element.type) {
            case "divider":
              return <Timeline key={element.id} element={element} />;

            case "msg":
              switch (element.subtype) {
                case "img":
                  return (
                    <MediaMessage
                      key={element.id}
                      element={element}
                      menu={menu}
                    />
                  );
                case "doc":
                  return (
                    <DocumentMessage
                      key={element.id}
                      element={element}
                      menu={menu}
                    />
                  );
                case "link":
                  return (
                    <LinkMessage
                      key={element.id}
                      element={element}
                      menu={menu}
                    />
                  );
                case "reply":
                  return (
                    <ReplyMessage
                      key={element.id}
                      element={element}
                      menu={menu}
                    />
                  );
                default:
                  return (
                    <TextMessage
                      key={element.id}
                      element={element}
                      menu={menu}
                    />
                  );
              }

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
