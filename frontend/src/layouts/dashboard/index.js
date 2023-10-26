import SideBar from "./SideBar";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
//React
import { useEffect } from "react";

// React-Redux
import { useDispatch, useSelector } from "react-redux";

// Redux
import {
  openSnackBar,
  updateSingleChatConversations,
  addSingleChatConversations,
  selectConversation,
  addSingleChatMessage,
  setSingleChatCurrentConversations,
  fetchSingleChatConversations,
  setIncomingVoiceCall,
  setIncomingVideoCall,
  endCall,
} from "../../store";

// Call
import VoiceCall from "../../sections/call/VoiceCall";
import VideoCall from "../../sections/call/VideoCall";
import IncomingVoiceCall from "../../sections/call/IncomingVoiceCall";
import IncomingVideoCall from "../../sections/call/IncomingVideoCall";

// Socket
import { socket, connectSocket } from "../../socket";

const DashboardLayout = () => {
  // React-Redux
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const { conversations } = useSelector((state) => state.chat.singleChat);

  const { voiceCall, videoCall, incomingVoiceCall, incomingVideoCall } =
    useSelector((state) => state.call);

  const userId = window.localStorage.getItem("userId");
  // console.log(userId);

  useEffect(() => {
    if (!socket) {
      connectSocket(userId);
    }

    // "new_friend_request"
    socket?.on("new_friend_request", (data) => {
      dispatch(
        openSnackBar({
          severity: "success",
          message: data.message,
        })
      );
    });
    socket?.on("request_accepted", (data) => {
      dispatch(
        openSnackBar({
          severity: "success",
          message: data.message,
        })
      );
    });
    socket?.on("request_sent", (data) => {
      dispatch(
        openSnackBar({
          severity: "success",
          message: data.message,
        })
      );
    });
    socket?.on("friend_exist", (data) => {
      dispatch(
        openSnackBar({
          severity: "info",
          message: data.message,
        })
      );
    });

    socket?.on("start_chat", (data) => {
      console.log(data);
      // add / update singleChat conversation
      const exisitingConversations = conversations.find(
        (element) => element?.id === data._id
      );

      if (exisitingConversations) {
        // update single chat conversation
        dispatch(updateSingleChatConversations({ conversations: data }));
      } else {
        // add new singlechat conversation
        dispatch(addSingleChatConversations({ conversations: data }));
      }
      dispatch(selectConversation({ roomId: data._id }));
      dispatch(
        setSingleChatCurrentConversations({
          id: data._id,
        })
      );
    });

    socket?.on("new_message", (data) => {
      const message = data.message;

      // check if msg we got is from currently selected conversation
      // if (currentConversation?.id === data.conversationId) {
      dispatch(
        addSingleChatMessage({
          id: message._id,
          type: "msg",
          subtype: message.type,
          message: message.text,
          incoming: message.to === userId,
          outgoing: message.from === userId,
        })
      );
      // }
    });

    // Call
    socket.on("incoming-voice-call", ({ from, roomId, callType }) => {
      dispatch(
        setIncomingVoiceCall({
          incomingVoiceCall: {
            userId: from.id,
            ...from,
            roomId,
            callType,
          },
        })
      );
    });

    socket.on("incoming-video-call", ({ from, roomId, callType }) => {
      dispatch(
        setIncomingVideoCall({
          incomingVideoCall: {
            userId: from.id,
            ...from,
            roomId,
            callType,
          },
        })
      );
    });

    socket.on("voice-call-rejected", () => {
      dispatch(endCall());
    });

    socket.on("video-call-rejected", () => {
      dispatch(endCall());
    });

    // Cleanup function
    // calling off sockets
    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
      socket?.off("friend_exist");
      socket?.off("start_chat");
      socket?.off("new_message");
      socket?.off("incoming-voice-call");
      socket?.off("incoming-video-call");
      socket?.off("voice-call-rejected");
      socket?.off("video-call-rejected");
    };
  }, [isLoggedIn, socket]);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      {incomingVoiceCall && <IncomingVoiceCall />}
      {incomingVideoCall && <IncomingVideoCall />}
      {Boolean(voiceCall) ? (
        <VoiceCall />
      ) : Boolean(videoCall) ? (
        <VideoCall />
      ) : (
        <Stack direction="row">
          <SideBar />
          <Outlet />
        </Stack>
      )}
    </>
  );
};

export default DashboardLayout;
