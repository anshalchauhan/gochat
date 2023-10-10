// React
import React from "react";

// MUI
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Grid,
  Stack,
  Typography,
  Button,
  DialogActions,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const shortcutList = [
  {
    key: 0,
    title: "Mark as unread",
    combination: ["Cmd", "Shift", "U"],
  },
  {
    key: 1,
    title: "Mute",
    combination: ["Cmd", "Shift", "M"],
  },
  {
    key: 2,
    title: "Archive Chat",
    combination: ["Cmd", "Shift", "E"],
  },
  {
    key: 3,
    title: "Delete Chat",
    combination: ["Cmd", "Shift", "D"],
  },
  {
    key: 4,
    title: "Pin Chat",
    combination: ["Cmd", "Shift", "P"],
  },
  {
    key: 5,
    title: "Pin Chat",
    combination: ["Cmd", "Shift", "P"],
  },
  {
    key: 6,
    title: "Search Chat",
    combination: ["Cmd", "Shift", "F"],
  },
  {
    key: 7,
    title: "Next Chat",
    combination: ["Cmd", "N"],
  },
  {
    key: 8,
    title: "Next Step",
    combination: ["Cmd", "Tab"],
  },
  {
    key: 9,
    title: "Previous Step",
    combination: ["Cmd", "Shift", "Tab"],
  },
  {
    key: 10,
    title: "New Group",
    combination: ["Cmd", "Shift", "N"],
  },
  {
    key: 11,
    title: "Profile & About",
    combination: ["Cmd", "P"],
  },
  {
    key: 12,
    title: "Increase speed of voice message",
    combination: ["Shift", "."],
  },
  {
    key: 13,
    title: "Decrease speed of voice message",
    combination: ["Shift", ","],
  },
  {
    key: 14,
    title: "Settings",
    combination: ["Shift", "S"],
  },
  {
    key: 15,
    title: "Emoji Panel",
    combination: ["Cmd", "E"],
  },
  {
    key: 16,
    title: "Sticker Panel",
    combination: ["Cmd", "S"],
  },
];

const Shortcuts = ({ open, handleClose }) => {
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        keepMounted
        TransitionComponent={Transition}
        sx={{ p: 2 }}
      >
        <DialogTitle>Keyboard Shortcuts</DialogTitle>
        <DialogContent sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            {shortcutList.map(({ key, title, combination }) => {
              return (
                <Grid key={key} item xs={6}>
                  <Stack
                    x={{ width: "100%" }}
                    spacing={3}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variants="caption" sx={{ fontSize: 14 }}>
                      {title}
                    </Typography>
                    <Stack spacing={1} direction="row">
                      {combination.map((element, index) => {
                        return (
                          <Button
                            key={index}
                            disabled
                            size="small"
                            variant="contained"
                            sx={{ color: "#212121" }}
                          >
                            {element}
                          </Button>
                        );
                      })}
                    </Stack>
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Shortcuts;
