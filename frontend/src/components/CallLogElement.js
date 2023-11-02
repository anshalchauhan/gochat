// Element Box Wrapper
import ElementWrapper from "./ElementWrapper";

// MUI
import { Avatar, IconButton, Stack, Typography } from "@mui/material";

// Importing Custom MUI Components
import StyledBadge from "./StyledBadge";

// Faker
import { faker } from "@faker-js/faker";

// Phosphor React
import { ArrowDownLeft, ArrowUpRight, Phone } from "phosphor-react";

const CallLogElement = ({ online, incoming, missed }) => {
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
          {/* Name and Call History */}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">
              {faker.person.fullName()}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              {incoming ? (
                <ArrowDownLeft color={missed ? "red" : "green"} />
              ) : (
                <ArrowUpRight color={missed ? "red" : "green"} />
              )}
              <Typography variant="caption">Yesterday 21:24</Typography>
            </Stack>
          </Stack>
        </Stack>
        <IconButton>
          <Phone color="green" />
        </IconButton>
      </Stack>
    </ElementWrapper>
  );
};

export default CallLogElement;
