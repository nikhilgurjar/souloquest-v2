import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import BookingInformation from "./BookingInformation";
const BookingDetails = () => {
  return (
    <Container>
      <Box sx={{ mb: 5 }}>
        <Stack direction="row" alignItems="center">
          <Box sx={{ flexGrow: 1 }}>
            {/* HEADING */}
            <Typography variant="h4" gutterBottom>
              Booking Details
            </Typography>
          </Box>
        </Stack>
      </Box>
      <BookingInformation />
    </Container>
  );
};

export default BookingDetails;
