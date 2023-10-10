//React
import { useState } from "react";

//MUI
import { Stack, IconButton, Typography, Avatar, Divider } from "@mui/material";

//Phosphor React
import {
  Bell,
  CaretLeft,
  Lock,
  PencilCircle,
  Info,
  Note,
  Keyboard,
  Key,
  Image,
} from "phosphor-react";

// Components
import Shortcuts from "../../sections/settings/Shortcuts";

// Style Wrapper
import LeftBoxWrapper from "../../components/LeftBoxWrapper";

// React Redux
import { useSelector } from "react-redux";

const Settings = () => {
  //State to handle Shortcut Dialog
  const [openShortcuts, setOpenShortcuts] = useState(false);

  const handleOpenShortcuts = () => {
    setOpenShortcuts(true);
  };

  const handleCloseShortcuts = () => {
    setOpenShortcuts(false);
  };

  // Redux
  const { avatar, about, firstName, lastName } = useSelector(
    (state) => state.user.user
  );

  //Options List
  const optionsList = [
    {
      key: 0,
      icon: <Bell size={16} />,
      title: "Notifications",
      onclick: () => {},
    },
    {
      key: 1,
      icon: <Lock size={16} />,
      title: "Privacy",
      onclick: () => {},
    },
    {
      key: 2,
      icon: <Key size={16} />,
      title: "Security",
      onclick: () => {},
    },
    {
      key: 3,
      icon: <PencilCircle size={16} />,
      title: "Theme",
      onclick: () => {},
    },
    {
      key: 4,
      icon: <Image size={16} />,
      title: "Chat Wallpaper",
      onclick: () => {},
    },
    {
      key: 5,
      icon: <Note size={16} />,
      title: "Request Account Info",
      onclick: () => {},
    },
    {
      key: 6,
      icon: <Keyboard size={16} />,
      title: "Keyboard Shortcuts",
      onclick: handleOpenShortcuts,
    },
    {
      key: 7,
      icon: <Info size={16} />,
      title: "Help",
      onclick: () => {},
    },
  ];

  //Styles
  const profileAvatarStyle = {
    width: 56,
    height: 56,
  };

  return (
    <>
      <Stack>
        {/* Left Panel */}
        <LeftBoxWrapper padding={4} spacing={4}>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={4}>
            <IconButton>
              <CaretLeft size={24} color={"#4B4B4B"} />
            </IconButton>
            <Typography variant="h6">Settings</Typography>
          </Stack>
          {/* Profile */}
          <Stack direction="row" spacing={3}>
            <Avatar sx={profileAvatarStyle} src={avatar} alt={"avatar image"} />
            <Stack spacing={0.5}>
              <Typography variant="article">{`${firstName} ${lastName}`}</Typography>
              <Typography variant="body2">{about}</Typography>
            </Stack>
          </Stack>
          {/* List of options */}
          <Stack spacing={3}>
            {optionsList.map(({ key, icon, title, onclick }) => {
              return (
                <Stack
                  key={key}
                  spacing={2}
                  sx={{ cursor: "pointer" }}
                  onClick={onclick}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    {icon}
                    <Typography variant="subtitle2">{title}</Typography>
                  </Stack>
                  {key !== 7 && <Divider />}
                </Stack>
              );
            })}
          </Stack>
        </LeftBoxWrapper>
      </Stack>
      <Shortcuts open={openShortcuts} handleClose={handleCloseShortcuts} />
    </>
  );
};

export default Settings;
