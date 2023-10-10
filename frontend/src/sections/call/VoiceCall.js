import { useEffect } from "react";
import Container from "./Container";
import { useSelector } from "react-redux";
import { socket } from "../../socket";

const VoiceCall = () => {
  const { voiceCall } = useSelector((state) => state.call);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (voiceCall?.type === "out-going") {
      socket?.emit("outgoing-voice-call", {
        to: voiceCall.userId,
        from: {
          id: user._id,
          img: user.avatar,
          name: `${user.firstName} ${user.lastName}`,
        },
        callType: voiceCall.callType,
        roomId: voiceCall.roomId,
      });
    }
  }, [voiceCall]);

  return <Container data={voiceCall} />;
};

export default VoiceCall;
