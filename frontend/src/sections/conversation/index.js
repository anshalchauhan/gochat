// React
import { useRef } from "react";
import { Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
import Footer from "./Footer";
import Header from "./Header";
import Message from "./Message";
import ScrollBar from "../../components/ScrollBar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Conversation = () => {
  // TODO: isMobile
  const messageListRef = useRef(null);

  const { currentMessages } = useSelector((state) => state.chat.singleChat);

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [currentMessages]);

  return (
    <Stack height="100%" maxHeight="100vh" width="auto">
      <Header />
      <ScrollBar
        ref={messageListRef}
        className="scrollbar"
        width="100%"
        sx={{ flexGrow: 1, height: "100%", overflowY: "scroll" }}
      >
        <Message menu={true} />
      </ScrollBar>
      <Footer />
    </Stack>
  );
};

export default Conversation;
