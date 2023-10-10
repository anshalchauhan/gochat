// React
import { useState } from "react";
// MUI
import { Dialog, DialogContent, Tabs, Tab, Stack } from "@mui/material";
// React-Redux
import { useSelector } from "react-redux";
// Redux
import { fetchUsers, fetchFriends, fetchFriendRequests } from "../../store";
// Component
import List from "./List";

const Friends = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);

  const { users, friends, friendRequests } = useSelector((state) => state.user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      keepMounted
      onClose={handleClose}
      sx={{ p: 4 }}
    >
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explorer" />
          <Tab label="Friends" />
          <Tab label="Requests" />
        </Tabs>
      </Stack>
      {/* Dialog Content */}
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.5}>
            {(() => {
              switch (value) {
                case 0: // display all users
                  // Contacts or Groups
                  return (
                    <List
                      thunk={fetchUsers}
                      list={users}
                      type="friend_request"
                    />
                  );

                case 1: // display all friends
                  // Calls
                  return (
                    <List
                      thunk={fetchFriends}
                      list={friends}
                      type="start_conversation"
                    />
                  );

                case 2: // display all friend requests
                  return (
                    <List
                      thunk={fetchFriendRequests}
                      list={friendRequests}
                      type="accept_request"
                    />
                  );

                default:
                  break;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Friends;
