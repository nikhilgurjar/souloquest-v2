import React from "react";
import Container from "@mui/material/Container";

// import Grid from "@mui/material/Unstable_Grid2";
// import {
//   BookingIllustration,
//   CheckInIllustration,
//   CheckoutIllustration,
// } from "@/assets/illustrations";
// import BookingWidgetSummary from "./BookingWidgetSummary";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const page = async () => {
  // const response = await fetch("/");
  return (
    <Container maxWidth={"xl"}>
      {/* <Grid container spacing={3} gap={3} disableEqualOverflow>
        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="Total Booking"
            total={714000}
            icon={<BookingIllustration />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="Sold"
            total={311000}
            icon={<CheckInIllustration />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="Canceled"
            total={124000}
            icon={<CheckoutIllustration />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="Canceled"
            total={124000}
            icon={<CheckoutIllustration />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <BookingWidgetSummary
            title="Canceled"
            total={124000}
            icon={<CheckoutIllustration />}
          />
        </Grid>
      </Grid> */}
      <Typography variant="h6" sx={{ color: "primary" }}>
        We are currently not Supporting Dashboard Stastics
      </Typography>
    </Container>
  );
};

export default page;
