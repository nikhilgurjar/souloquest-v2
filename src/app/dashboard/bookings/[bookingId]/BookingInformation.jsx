"use client";
import useApi from "@/actions/useCompanyApi";
import Iconify from "@/components/iconify";
import { SkeletonPostDetails } from "@/components/skeleton";
import { fDate } from "@/utils/formatTime";
import { Box, Divider, ListItemText, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TravellerDetails from "./TravellerDetail";

const BookingInformation = () => {
  const { bookingId } = useParams();
  const api = useApi();
  const [bookingDetail, setBookingDetail] = useState();
  const [loading, setLoading] = useState(false);

  const GetBookingDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `bookings/getdetails?bookingId=${bookingId}`
      );
      setBookingDetail(response.bookingDetails);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetBookingDetails();
  }, [bookingId]);

  if (loading) {
    return <SkeletonPostDetails />;
  }

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        }}
      >
        {[
          {
            label: "Travel Date",
            value: `${fDate(bookingDetail?.dateOfTravel)}`,
            icon: <Iconify icon="solar:calendar-date-bold" />,
          },
          {
            label: "Tour Company",
            value: bookingDetail?.tourCompany?.name,
            icon: <Iconify icon="solar:user-rounded-bold" />,
          },
          {
            label: "Number of Travellers",
            value: `${bookingDetail?.numPersons} Persons`,
            icon: <Iconify icon="solar:clock-circle-bold" />,
          },
          {
            label: "Pricing Option",
            value: `${bookingDetail?.pricingOption?.startLocation} to ${bookingDetail?.pricingOption?.endLocation} at ${bookingDetail?.pricingOption?.price}`,
            icon: <Iconify icon="solar:clock-circle-bold" />,
          },
          {
            label: "Agency Email",
            value: `${bookingDetail?.tourCompany?.email}`,
            icon: <Iconify icon="solar:clock-circle-bold" />,
          },
          {
            label: "Agency Contact",
            value: `${bookingDetail?.tourCompany?.phoneNumber}`,
            icon: <Iconify icon="solar:clock-circle-bold" />,
          },
        ].map((item) => (
          <Stack key={item.label} spacing={1.5} direction="row">
            {item.icon}
            <ListItemText
              primary={item.label}
              secondary={item.value}
              primaryTypographyProps={{
                typography: "body2",
                color: "text.secondary",
                mb: 0.5,
              }}
              secondaryTypographyProps={{
                typography: "subtitle2",
                color: "text.primary",
                component: "span",
              }}
            />
          </Stack>
        ))}
      </Box>
      <Divider sx={{ borderStyle: "dashed", my: 5 }} />
      <Stack>
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          Comments from Travellers
        </Typography>

        <Typography variant="body1" sx={{ color: "text.primary" }}>
          {bookingDetail?.comments ?? "No comments given"}
        </Typography>
      </Stack>
      <Divider sx={{ borderStyle: "dashed", my: 5 }} />
      <Grid container spacing={3} gap={3} disableEqualOverflow>
        <Grid xs={12}>
          <TravellerDetails
            title="Traveller Details"
            tableData={bookingDetail?.bookingDetails}
            tableLabels={[
              { id: "name", label: "Name" },
              { id: "gender", label: "Gender" },
              { id: "age", label: "Age" },
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BookingInformation;
