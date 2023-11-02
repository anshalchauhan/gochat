// React
import { useState } from "react";

// Chat
import Chat from "./Chat";

// MUI
import { Stack, Typography, Link, IconButton } from "@mui/material";

// MUI Styles
import { useTheme } from "@mui/material/styles";

// Phosphor React
import { Plus } from "phosphor-react";

// Importing Custom MUI Component
import AlertDialog from "../../components/AlertDialog";

// Importing Dialog Component
import StartCallDialog from "../../sections/friends/StartCallDialog";

const Call = () => {
  // Theme
  const theme = useTheme();

  // State to handle Create New Group Dialog
  const [openCreateNewCall, setOpenCreateNewCall] = useState(false);

  const handlerOpenCreateNewCall = () => {
    setOpenCreateNewCall(true);
  };

  const handlerCloseCreateNewCall = () => {
    setOpenCreateNewCall(false);
  };

  // Option Component
  const createNewCall = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="subtitle2" component={Link}>
        Start Call
      </Typography>
      <IconButton onClick={handlerOpenCreateNewCall}>
        <Plus style={{ color: theme.palette.primary.main }} />
      </IconButton>
    </Stack>
  );

  return (
    <>
      <Chat heading="Call Logs" option={createNewCall} elementType="Call" />
      <AlertDialog
        open={openCreateNewCall}
        onClose={handlerCloseCreateNewCall}
        dialogText="Start Call"
        dialogForm={<StartCallDialog />}
        fullWidth
        maxWidth="xs"
      ></AlertDialog>
    </>
  );
};

export default Call;
