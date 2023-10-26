import { useState } from "react";
import useSettings from "../../hooks/useSettings";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AntSwitch from "../../components/AntSwitch";
import Logo from "../../assets/Images/Logo.svg";
import { Gear } from "phosphor-react";
import { Nav_Buttons, Nav_Setting, Profile_Menu } from "../../data";

// React Router Dom
import { useNavigate } from "react-router-dom";

// Redux
import { logout, logoutChat, logoutUser } from "../../store";

// React-Redux
import { useDispatch, useSelector } from "react-redux";

const SideBar = () => {
  //state to know which button is selected
  const [selected, setSelected] = useState(0);

  // React-Redux
  const dispatch = useDispatch();
  const { avatar } = useSelector((state) => state.user.user);

  //To use the theme we configured in MUI
  const theme = useTheme();

  //To Navigate
  const navigate = useNavigate();

  //To change the theme of the app
  const { onToggleMode } = useSettings();

  //Menu (Profile, Settings, Logout)
  const [anchorElement, setAnchorElement] = useState();
  const open = Boolean(anchorElement);
  const handleClick = (event) => {
    setAnchorElement(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  //Styles for Elements

  //sideBar
  const sideBarStyle = {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
    height: "100vh",
    width: 100,
    padding: 2,
  };

  //logo
  const logoStyle = {
    height: 64,
    width: 64,
    borderRadius: 100,
  };

  //selectedTab
  const selectedTabStyle = {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 100,
    padding: 0.5,
  };

  //iconButton
  const iconStyle = {
    width: "max-content",
    color: theme.palette.mode === "light" ? "#000" : "#fff",
  };

  const iconSelectedStyle = {
    width: "max-content",
    color: "#fff",
  };

  //Divider
  const dividerStyle = {
    width: "48px",
  };

  return (
    <Box sx={sideBarStyle}>
      <Stack
        sx={{ width: "100%", height: "100%" }}
        direction="column"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack alignItems={"center"} spacing={4}>
          <Box sx={logoStyle}>
            <img src={Logo} alt="GoChat Logo" />
          </Box>
          <Stack
            sx={{ width: "max-content" }}
            direction="column"
            alignItems="center"
            spacing={3}
          >
            {/* Navigation Tab */}
            {Nav_Buttons.map(({ index, icon, path }) =>
              index === selected ? (
                <Box key={index} sx={selectedTabStyle}>
                  <IconButton sx={iconSelectedStyle}>{icon}</IconButton>
                </Box>
              ) : (
                <IconButton
                  sx={iconStyle}
                  key={index}
                  onClick={() => {
                    setSelected(index);
                    navigate(path);
                  }}
                >
                  {icon}
                </IconButton>
              )
            )}
            <Divider sx={dividerStyle} />
            {/* Settings */}
            {selected === Nav_Setting.index ? (
              <Box sx={selectedTabStyle}>
                <IconButton sx={iconSelectedStyle}>
                  {Nav_Setting.icon}
                </IconButton>
              </Box>
            ) : (
              <IconButton
                onClick={() => {
                  setSelected(Nav_Setting.index);
                  navigate(Nav_Setting.path);
                }}
              >
                <Gear />
              </IconButton>
            )}
          </Stack>
        </Stack>
        <Stack alignItems={"center"} spacing={4}>
          {theme.palette.mode === "dark" ? (
            <AntSwitch
              onChange={() => {
                onToggleMode();
              }}
              defaultChecked
            />
          ) : (
            <AntSwitch
              onChange={() => {
                onToggleMode();
              }}
            />
          )}
          <Avatar
            id="basic-button"
            src={avatar}
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
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map(({ index, title, icon, path }) => {
                return (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    <Stack
                      onClick={() => {
                        if (index === 2) {
                          dispatch(logoutChat());
                          dispatch(logoutUser());
                          dispatch(logout());
                        } else navigate(path);
                      }}
                      sx={{ width: 100 }}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <span>{title}</span>
                      {icon}
                    </Stack>
                  </MenuItem>
                );
              })}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
