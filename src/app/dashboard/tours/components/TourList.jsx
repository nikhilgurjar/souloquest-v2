"use client";
import { Box } from "@mui/material";
import React from "react";
import { useTours } from "./TourContext";
import TourSkeleton from "./TourSkeleton";
import TourCard from "./TourCard";

const TourList = () => {
  const { tours, loading } = useTours();
  return (
    <Box
      sx={{
        columnGap: 3,
        display: "grid",
        rowGap: { xs: 4, md: 5 },
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
      }}
    >
      {!!loading
        ? [...Array(8)].map((tour, index) => <TourSkeleton key={index} />)
        : tours.map((tour, index) => <TourCard key={tour.id} tour={tour} />)}
    </Box>
  );
};

export default TourList;
