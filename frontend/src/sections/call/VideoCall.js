import { useEffect } from "react";
import Container from "./Container";
import { useSelector } from "react-redux";
import { socket } from "../../socket";

const VideoCall = () => {
  // React redux
  const { videoCall } = useSelector((state) => state.call);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (videoCall?.type === "out-going") {
      //  TODO: socket.current.emit
      socket?.emit("outgoing-video-call", {
        to: videoCall.userId,
        from: {
          id: user._id,
          img: user.avatar,
          name: `${user.firstName} ${user.lastName}`,
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId,
      });
    }
  }, [videoCall]);

  return <Container data={videoCall} />;
};

export default VideoCall;
