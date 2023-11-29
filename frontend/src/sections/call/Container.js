// React
import { useState, useEffect } from "react";

// MUI
import { IconButton, Stack, Typography } from "@mui/material";

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
      try {
        const zg = new ZegoExpressEngine(ZEGO_APP_ID, ZEGO_SERVER_SECRET);
        const callCloseButton = document.getElementById("closeCall");

        // to start remote video
        const rmVideo = document.getElementById("remote-video");

        zg.on(
          "roomStreamUpdate",
          async (roomID, updateType, streamList, extendedData) => {
            if (updateType === "ADD") {
              // rmVideo is remoteVideo
              const vd = document.createElement(
                data?.callType === "video" ? "video" : "audio"
              );

              vd.style.cssText = "height: 480px; width: 640px;";
              vd.autoplay = true;
              vd.playsInline = true;
              vd.muted = false;
              if (rmVideo) {
                let element = document.getElementById("video-remote-zego");

                if (element) element.parentNode.removeChild(element);

                vd.id = "video-remote-zego";
                rmVideo.appendChild(vd);
              }

              zg.startPlayingStream(streamList[0].streamID, {
                audio: true,
                video: true,
              }).then((stream) => {
                if (vd) vd.srcObject = stream;
              });
            } else if (updateType === "DELETE") {
              zg.stopPlayingStream(streamList[0].streamID);
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

        const streamID = new Date().getTime().toString();

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

        // Function to close call
        const closeCall = (flag) => {
          zg.stopPublishingStream(streamID);
          zg.destroyStream(localStream);
          zg.logoutRoom(data?.roomId.toString());
          // zg.destroyEngine();

          // To send an event to the other participant to close call
          if (flag) {
            socket?.emit("close-ongoing-call", {
              id: data?.userId,
            });
          }

          dispatch(endCall());
        };

        callCloseButton.addEventListener("click", () => closeCall(true));

        socket?.on("close-call", () => closeCall(false));
      } catch (err) {
        console.log(err);
      }
    };

    if (token) {
      startCall();
    }
  }, [token]);

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
              />
            )}
          </Stack>
          {callAccepted && (
            <div style={{ position: "relative" }} id="remote-video">
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                id="local-video"
              ></div>
            </div>
          )}
          <IconButton
            id="closeCall"
            style={{ width: 64, height: 64, padding: 0, marginTop: 48 }}
            sx={{
              fontSize: 32,
              backgroundColor: (theme) => theme.palette.error.main,
            }}
            variant="contained"
          >
            <PhoneSlash color="#fff" />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
};

export default Container;
