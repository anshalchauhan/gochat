// Importing Components
import SearchBar from "../../components/SearchBar";
import CallElement from "../../components/CallElement";

// MUI
import { Stack } from "@mui/material";

const StartCallDialog = () => {
  return (
    <Stack spacing={2}>
      <SearchBar />
      <CallElement online={true} />
      <CallElement />
    </Stack>
  );
};

export default StartCallDialog;
