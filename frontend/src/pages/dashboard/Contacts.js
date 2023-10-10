// Chat
import Chat from "./Chat";

// MUI
import { Stack, Button } from "@mui/material";

// Phosphor React
import { ArchiveBox } from "phosphor-react";

const Contacts = () => {
  const archive = (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <ArchiveBox size={24} />
      <Button>Archive</Button>
    </Stack>
  );

  return (
    <Chat
      heading="Chats"
      type="All Chats"
      option={archive}
      elementType="Chat"
    />
  );
};

export default Contacts;
