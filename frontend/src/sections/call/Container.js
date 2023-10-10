// React
import { useState, useEffect } from "react";

// MUI
import { Box, IconButton, Stack, Typography } from "@mui/material";

// Phosphor Icons
import { PhoneSlash } from "phosphor-react";

// React Redux
import { useDispatch, useSelector } from "react-redux";

// Redux
import { endCall } from "../../store";

// Socket
import { socket } from "../../socket";

// Importing axios instance from utility folder
import axios from "../../utils/axios";

// Zego
import { ZEGO_APP_ID, ZEGO_SERVER_SECRET } from "../../config";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";

const Container = ({ data }) => {
  // React Redux
  const dispatch = useDispatch();
  const { token: loginToken } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  // State
  const [callAccepted, setCallAccepted] = useState(false);
  const [token, setToken] = useState(undefined);
  const [zgVar, setZgVar] = useState(undefined);
  const [localStream, setLocalStream] = useState(undefined);
  const [publishStream, setPublishStream] = useState(undefined);

  useEffect(() => {
    if (data?.type === "out-going") {
      socket?.on("accept-call", () => setCallAccepted(true));
    } else {
      setTimeout(() => {
        setCallAccepted(true);
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    console.log("callAccepted");
    const getToken = async () => {
      try {
        const {
          data: { token: returnedToken },
        } = await axios.get("api/v1/user/generate-zego-token", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginToken}`,
          },
        });

        setToken(returnedToken);
      } catch (err) {
        console.log(err);
      }
    };
    getToken();
  }, [callAccepted]);

  useEffect(() => {
    const startCall = async () => {
      const zg = new ZegoExpressEngine(ZEGO_APP_ID, ZEGO_SERVER_SECRET);
      setZgVar(zg);

      zg.on(
        "roomStreamUpdate",
        async (roomID, updateType, streamList, extendedData) => {
          if (updateType === "ADD") {
            // rmVideo is remoteVideo
            const rmVideo = document.getElementById("remote-video");
            const vd = document.createElement(
              data?.callType === "video" ? "video" : "audio"
            );
            vd.id = streamList[0].streamID;
            vd.autoplay = true;
            vd.playsInline = true;
            vd.muted = false;
            if (rmVideo) {
              rmVideo?.appendChild(vd);
            }

            zg.startPlayingStream(streamList[0].streamID, {
              audio: true,
              video: true,
            }).then((stream) => {
              if (vd) vd.srcObject = stream;
            });
          } else if (
            updateType === "DELETE" &&
            zg &&
            localStream &&
            streamList[0].streamID
          ) {
            zg.destroyStream(localStream);
            zg.stopPublishingStream(streamList[0].streamID);
            zg.logoutRoom(data?.roomId.toString());
            zgVar.destroyEngine();
            setZgVar(undefined);
            dispatch(endCall());
          }
        }
      );

      // to start our local Video
      const localStream = await zg.createStream({
        camera: {
          audio: true,
          video: data?.callType === "video" ? true : false,
        },
      });

      const localVideo = document.getElementById("local-video");
      const videoElement = document.createElement(
        data.callType === "video" ? "video" : "audio"
      );
      videoElement.id = "video-local-zego";
      videoElement.style.cssText = "height: 150px; width: 300px;";
      videoElement.autoplay = true;
      videoElement.muted = false;
      videoElement.playsInline = true;

      localVideo?.appendChild(videoElement);
      const td = document.getElementById("video-local-zego");
      if (td) td.srcObject = localStream;
      let streamID = new Date().getTime().toString();
      setPublishStream(streamID);
      setLocalStream(localStream);

      zg.loginRoom(
        data?.roomId.toString(),
        token,
        {
          userID: user._id.toString(),
          userName: user._id.toString(),
        },
        {
          userUpdate: true,
        }
      ).then(() => {
        zg.startPublishingStream(streamID, localStream);
      });
    };
    if (token) {
      startCall();
    }
  }, [token]);

  // closeCall function
  const closeCall = () => {
    if (zgVar && localStream && publishStream) {
      zgVar.destroyStream(localStream);
      zgVar.stopPublishingStream(publishStream);
      zgVar.logoutRoom(data?.roomId.toString());
      zgVar.destroyEngine();
      setZgVar(undefined);
    }
    if (data?.callType === "video") {
      socket?.emit("reject-video-call", {
        from: data?.userId,
      });
    } else {
      socket?.emit("reject-voice-call", {
        from: data?.userId,
      });
    }
    dispatch(endCall());
  };

  return (
    <>
      <Stack
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        height="100%"
        maxHeight="100vh"
        width="auto"
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Stack height="80%" direction="column" alignItems="center">
          <Stack direction="column" spacing={6} alignItems="center">
            <Stack direction="column" spacing={2} alignItems="center">
              <Typography variant="h2">{data?.name}</Typography>
              <Typography variant="h6">
                {callAccepted ? "On going call" : "Calling..."}
              </Typography>
            </Stack>
            {!callAccepted && (
              <img
                src={data?.img}
                alt={`${data?.name}'s profile`}
                height={300}
                width={300}
                // style={{ marginBottom: "48px" }}
              />
            )}
          </Stack>
          {callAccepted && (
            <Box sx={{ position: "relative" }} id="remote-video">
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                id="local-video"
              ></Box>
            </Box>
          )}
          <IconButton
            style={{ width: 64, height: 64, padding: 0, marginTop: 48 }}
            sx={{
              fontSize: 32,
              backgroundColor: (theme) => theme.palette.error.main,
            }}
            variant="contained"
            onClick={closeCall}
          >
            <PhoneSlash color="#fff" />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
};

export default Container;
