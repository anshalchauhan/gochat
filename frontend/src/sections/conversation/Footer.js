import { useState, useRef, useEffect } from "react";
import {
  Box,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  Fab,
  Tooltip,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import React from "react";
import {
  LinkSimple,
  Smiley,
  PaperPlaneTilt,
  Image,
  Sticker,
  Camera,
  File,
  User,
} from "phosphor-react";

//Emoji Picker
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useSelector } from "react-redux";
import { socket } from "../../socket";

//Actions Data
const Actions = [
  {
    index: 0,
    color: "#4da5fe",
    icon: <Image size={24} />,
    y: 102,
    title: "Photo/Video",
  },
  {
    index: 1,
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    index: 2,
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    index: 3,
    color: "#0159b2",
    icon: <File size={24} />,
    y: 312,
    title: "Document",
  },
  {
    index: 4,
    color: "#013f7f",
    icon: <User size={24} />,
    y: 382,
    title: "Contact",
  },
];

const StyledInput = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

// There was a marginTop style bug in the InputAdornment component, so fixing it
const FixedInputAdornment = styled(InputAdornment)(() => ({
  "&.MuiInputAdornment-positionStart": {
    marginTop: "0 !important",
  },
}));

const ChatInput = ({
  openEmojiPicker,
  setOpenEmojiPicker,
  setValue,
  value,
  inputRef,
  sendMessage,
}) => {
  const [openActions, setOpenActions] = useState(false);

  return (
    <StyledInput
      inputRef={inputRef}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage();
        }
      }}
      fullWidth
      placeholder="Write a message..."
      variant="filled"
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack sx={{ width: "max-content" }}>
            {openActions && (
              <Stack sx={{ position: "relative" }}>
                {Actions.map((element) => {
                  return (
                    <Tooltip
                      key={element.index}
                      placement="right"
                      title={element.title}
                    >
                      <Fab
                        sx={{
                          position: "absolute",
                          top: -element.y,
                          backgroundColor: element.color,
                        }}
                      >
                        {element.icon}
                      </Fab>
                    </Tooltip>
                  );
                })}
              </Stack>
            )}
            <FixedInputAdornment position="start">
              <IconButton
                onClick={() => {
                  setOpenActions((prev) => !prev);
                }}
              >
                <LinkSimple />
              </IconButton>
            </FixedInputAdornment>
          </Stack>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setOpenEmojiPicker((prev) => !prev);
              }}
            >
              <Smiley />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

// Functions
// TODO: to learn about linkify and containsUrl
function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank">${url}</a>`
  );
}

function containsUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
}

const Footer = () => {
  const theme = useTheme();

  const userId = window.localStorage.getItem("userId");

  // React Redux
  const { currentConversation } = useSelector((state) => state.chat.singleChat);

  //TODO: ismobile, sidebar

  const { sideBar } = useSelector((state) => state.app);
  const { roomId } = useSelector((state) => state.user);

  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  function handleEmojiClick(emoji) {
    const input = inputRef.current;

    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      setValue(
        value.substring(0, selectionStart) +
          emoji +
          value.substring(selectionEnd)
      );

      // Move the cursor to the end of the inserted emoji
      input.selectionStart = input.selectionEnd = selectionStart + 1;
    }
  }

  //Styles for footer
  const footerStyle = {
    width: "100%",
    backgroundColor:
      theme.palette.mode === "light"
        ? "#F8FAFF"
        : theme.palette.background.paper,
    boxShadow: "0px 0px 2px rgb(0, 0, 0, 0.25)",
  };

  const footerEndAdornment = {
    height: 48,
    width: 48,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 1.5,
  };

  const footerEndAdornmentIcon = {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  };

  const sendMessage = () => {
    socket.emit("text_message", {
      message: linkify(value),
      conversationId: roomId,
      from: userId,
      to: currentConversation.userId,
      type: containsUrl(value) ? "Link" : "Text",
    });
    setValue("");
  };

  return (
    <Box p={2} sx={footerStyle}>
      <Stack direction="row" alignItems="center" spacing={3}>
        {" "}
        <Stack sx={{ width: "100%" }}>
          {openEmojiPicker && (
            <Box sx={{ zIndex: 10, position: "fixed", bottom: 81, right: 100 }}>
              <Picker
                theme={theme.palette.mode}
                data={data}
                onEmojiSelect={(emoji) => {
                  handleEmojiClick(emoji.native);
                }}
              />
            </Box>
          )}
          <ChatInput
            inputRef={inputRef}
            value={value}
            setValue={setValue}
            openEmojiPicker={openEmojiPicker}
            setOpenEmojiPicker={setOpenEmojiPicker}
            sendMessage={sendMessage}
          />
        </Stack>
        <Box sx={footerEndAdornment}>
          <Stack sx={footerEndAdornmentIcon}>
            <IconButton onClick={sendMessage}>
              <PaperPlaneTilt color="#fff" />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
