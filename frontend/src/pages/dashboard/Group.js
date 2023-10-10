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

// Importing Form
import CreateGroupDialogForm from "./CreateGroupDialogForm";

const Group = () => {
  // Theme
  const theme = useTheme();

  // State to handle Create New Group Dialog
  const [openCreateNewGroup, setOpenCreateNewGroup] = useState(false);

  const handlerOpenCreateNewGroup = () => {
    setOpenCreateNewGroup(true);
  };

  const handlerCloseCreateNewGroup = () => {
    setOpenCreateNewGroup(false);
  };

  // Option Component
  const createNewGroup = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="subtitle2" component={Link}>
        Create New Group
      </Typography>
      <IconButton onClick={handlerOpenCreateNewGroup}>
        <Plus style={{ color: theme.palette.primary.main }} />
      </IconButton>
    </Stack>
  );

  return (
    <>
      <Chat
        heading="Groups"
        type="All Groups"
        option={createNewGroup}
        elementType="Chat"
      />
      <AlertDialog
        open={openCreateNewGroup}
        onClose={handlerCloseCreateNewGroup}
        dialogText="Hello"
        dialogForm={
          <CreateGroupDialogForm onClose={handlerCloseCreateNewGroup} />
        }
        fullWidth
        maxWidth="xs"
      ></AlertDialog>
    </>
  );
};

export default Group;
