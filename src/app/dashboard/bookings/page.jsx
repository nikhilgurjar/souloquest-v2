"use client";
import React, { useEffect } from "react";
import { Container, Box, Stack, Typography } from "@mui/material";
import BookingsList from "./BookingsList";
import useApi from "@/actions/useCompanyApi";
import { SkeletonKanbanColumn } from "@/components/skeleton";

const BookingPage = () => {
  const api = useApi();
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get("bookings");
      setBookings(response.bookings);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return <SkeletonKanbanColumn />;
  }

  return (
    <Container maxWidth={"lg"}>
      <Box sx={{ mb: 5 }}>
        <Stack direction="row" alignItems="center">
          <Box sx={{ flexGrow: 1 }}>
            {/* HEADING */}
            <Typography variant="h4" gutterBottom>
              Bookings
            </Typography>
          </Box>
        </Stack>
      </Box>
      <BookingsList bookings={bookings} fetchBookings={fetchBookings} />
    </Container>
  );
};

export default BookingPage;
