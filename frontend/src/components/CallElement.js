// Element Box Wrapper
import ElementWrapper from "./ElementWrapper";

// MUI
import { Avatar, IconButton, Stack, Typography } from "@mui/material";

// Importing Custom MUI Components
import StyledBadge from "./StyledBadge";

// Faker
import { faker } from "@faker-js/faker";

// Phosphor React
import { Phone, VideoCamera } from "phosphor-react";

const CallElement = ({ online }) => {
  return (
    <ElementWrapper>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={faker.image.avatar()} />
            </StyledBadge>
          ) : (
            <Avatar alt={faker.person.fullName()} src={faker.image.avatar()} />
          )}
          <Typography variant="subtitle2">{faker.person.fullName()}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton>
            <Phone color="green" />
          </IconButton>
          <IconButton>
            <VideoCamera color="green" />
          </IconButton>
        </Stack>
      </Stack>
    </ElementWrapper>
  );
};

export default CallElement;
