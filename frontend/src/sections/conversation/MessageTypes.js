import {
  Box,
  Stack,
  Divider,
  Typography,
  Link,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DotsThreeVertical, DownloadSimple, Image } from "phosphor-react";
import { useState } from "react";
import { Message_options } from "../../data";

const Timeline = ({ element }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Divider width="46% " />
      <Typography variant="caption" sx={{ color: theme.palette.text }}>
        {element.text}
      </Typography>
      <Divider width="46% " />
    </Stack>
  );
};

const TextMessage = ({ element, menu }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={element.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: element.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Typography
          variant="body2"
          color={element.incoming ? theme.palette.text : "#fff"}
        >
          {element.message}
        </Typography>
      </Box>
      {menu && <MessageMenu />}
    </Stack>
  );
};

const MediaMessage = ({ element, menu }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={element.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: element.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <img
            src={element.img}
            alt={element.message}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />
          <Typography
            variant="body2"
            color={element.incoming ? theme.palette.text : "#fff"}
          >
            {element.message}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageMenu />}
    </Stack>
  );
};

const ReplyMessage = ({ element, menu }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" justifyContent={element.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: element.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction="column"
            spacing={3}
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color={theme.palette.text}>
              {element.message}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color={element.incoming ? theme.palette.text : "#fff"}
          >
            {element.reply}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageMenu />}
    </Stack>
  );
};

const LinkMessage = ({ element, menu }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={element.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: element.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            spacing={3}
            alignItems="start"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <img
              src={element.preview}
              alt={element.message}
              style={{ maxHeight: 210, borderRadius: "10px" }}
            />
            <Stack spacing={2}>
              <Typography variant="subtitle2">Creating Chat App</Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: theme.palette.primary.main }}
                component={Link}
                to="//https://www.youtube.com"
              >
                www.youtube.com
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color={element.incoming ? theme.palette.text : "#fff"}
            >
              {element.message}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      {menu && <MessageMenu />}
    </Stack>
  );
};

const DocumentMessage = ({ element, menu }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Stack direction="row" justifyContent={element.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: element.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Image size={48} />
            <Typography variant="caption">Abstract.png</Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            color={element.incoming ? theme.palette.text : "#fff"}
          >
            {element.message}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageMenu />}
    </Stack>
  );
};

const MessageMenu = () => {
  const [anchorElement, setAnchorElement] = useState();
  const open = Boolean(anchorElement);
  const handleClick = (event) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <>
      <DotsThreeVertical
        size={20}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorElement}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labeledby": "basic-button",
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map(({ index, title }) => {
            return (
              <MenuItem key={index} onClick={handleClick}>
                {title}
              </MenuItem>
            );
          })}
        </Stack>
      </Menu>
    </>
  );
};

export {
  Timeline,
  TextMessage,
  MediaMessage,
  ReplyMessage,
  LinkMessage,
  DocumentMessage,
};
