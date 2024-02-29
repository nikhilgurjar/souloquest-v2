import React from "react";
import { Container, Box, Stack, Typography } from "@mui/material";
import BookingRequestForm from "./BookingRequestForm";

const BookingAdd = () => {
  return (
    <Container
      maxWidth={"lg"}
      sx={{
        pt: { xs: 3 },
      }}
    >
      <Box sx={{ mb: 5 }}>
        <Stack direction="row" alignItems="center">
          <Box sx={{ flexGrow: 1 }}>
            {/* HEADING */}
            <Typography variant="h4" gutterBottom>
              Create a booking request.
            </Typography>
          </Box>
        </Stack>
      </Box>
      <BookingRequestForm />
    </Container>
  );
};

export default BookingAdd;
