//React
import { useState } from "react";

//MUI
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Tab,
  Tabs,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

//Custom MUI components
import ScrollBar from "../components/ScrollBar";

//Phosphor React
import { CaretLeft } from "phosphor-react";

//faker
import { faker } from "@faker-js/faker";

//Redux
import { useDispatch } from "react-redux";
import { updateSideBarType } from "./../store";

//Data
import { Shared_links, Shared_docs } from "./../data";

//Message Types
import { LinkMessage, DocumentMessage } from "./conversation/MessageTypes";

const SharedMessages = () => {
  //theme
  const theme = useTheme();

  //Redux
  const dispatch = useDispatch();

  //MUI Tabs
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Styles
  const headerBox = {
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
    width: "100%",
    backgroundColor:
      theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
  };

  const headerStack = {
    height: "100%",
    p: 2,
  };

  const bodyBox = {
    height: "100%",
    position: "relative",
    flexGrow: 1,
    overflowY: "scroll",
  };

  const tabsStyle = {
    px: 2,
    pt: 2,
  };

  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        {/* Header */}
        <Box sx={headerBox}>
          <Stack
            sx={headerStack}
            direction="row"
            alignItems="center"
            spacing={3}
          >
            <IconButton
              onClick={() => {
                dispatch(updateSideBarType("CONTACT"));
              }}
            >
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">Shared Messages</Typography>
          </Stack>
        </Box>
        <Tabs sx={tabsStyle} value={value} onChange={handleChange} centered>
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>
        {/* Body */}
        <ScrollBar className="scrollbar" sx={bodyBox}>
          <Stack p={3} spacing={3}>
            {(() => {
              switch (value) {
                case 0:
                  // Images
                  return (
                    <Grid container spacing={2}>
                      {[
                        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                        16, 17, 18, 19, 20,
                      ].map((el) => {
                        return (
                          <Grid key={el} item xs={4}>
                            <img
                              src={faker.image.avatar()}
                              alt={faker.person.fullName()}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  );

                case 1:
                  //Links
                  return Shared_links.map((el) => <LinkMessage element={el} />);

                case 2:
                  //Docs
                  return Shared_docs.map((el) => (
                    <DocumentMessage element={el} />
                  ));

                default:
                  break;
              }
            })()}
          </Stack>
        </ScrollBar>
      </Stack>
    </Box>
  );
};

export default SharedMessages;
