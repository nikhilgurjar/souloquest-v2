"use client";
import { Container, Box, Stack, Typography } from "@mui/material";
import React from "react";
import NewTourForm from "../NewTourForm";

const TourCreatePage = () => {
  return (
    <>
      <Container maxWidth={"lg"}>
        <Box sx={{ mb: 5 }}>
          <Stack direction="row" alignItems="center">
            <Box sx={{ flexGrow: 1 }}>
              {/* HEADING */}
              <Typography variant="h4" gutterBottom>
                Create New Tour
              </Typography>
            </Box>
          </Stack>
        </Box>
        <NewTourForm />
      </Container>
    </>
  );
};

export default TourCreatePage;
