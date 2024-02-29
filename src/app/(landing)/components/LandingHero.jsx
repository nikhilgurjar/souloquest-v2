import React from "react";
import {
  Stack,
  Container,
  Typography,
  Button,
  Fab,
  Unstable_Grid2 as Grid,
} from "@mui/material";
// utils
import Iconify from "@/components/iconify";
import ImageComponent from "./ImageComponent";
import { StyledRoot } from "./styles";

const LandingHero = () => {
  return (
    <StyledRoot>
      <Container
        sx={{
          py: 15,
          display: { md: "flex" },
          alignItems: { md: "center" },
          height: { md: `100vh` },
        }}
      >
        <Grid
          container
          columnSpacing={{ xs: 0, md: 10 }}
          flexWrap={{ xs: "wrap", md: "nowrap" }}
        >
          <Grid
            xs={12}
            md={7}
            sx={{
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="overline" sx={{ color: "secondary.main" }}>
              Optimize Tour Operations
            </Typography>

            <Typography variant="h1" sx={{ my: 3 }}>
              Boost Collaboration, Simplify Bookings
            </Typography>

            <Typography sx={{ color: "text.secondary" }}>
              Empower your travel agency with streamlined tour operations,
              enhanced collaboration tools, and simplified booking processes.
              Elevate efficiency and maximize growth effortlessly
            </Typography>

            <Stack
              spacing={3}
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "center", md: "unset" }}
              justifyContent={{ xs: "center", md: "unset" }}
              sx={{ mt: 5 }}
            >
              <Button variant="contained" color="primary" size="large">
                Try For Free
              </Button>

              <Stack
                direction="row"
                alignItems="center"
                sx={{ typography: "h6", background: "theme.secondary" }}
              >
                <Fab size="medium" sx={{ mr: 1 }}>
                  <Iconify width={24} icon="carbon:play" />
                </Fab>
                See Our Work
              </Stack>
            </Stack>
          </Grid>

          <ImageComponent />
        </Grid>
      </Container>
    </StyledRoot>
  );
};

export default LandingHero;
