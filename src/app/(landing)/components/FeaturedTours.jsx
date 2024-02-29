"use client";
import React from "react";
import { useRef } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import { Container, Stack, Typography, Box } from "@mui/material";
// hooks
import useResponsive from "@/hooks/useResponsive";
// types
// components
import Carousel, { CarouselArrows } from "@/components/carousel";
import TourItemCard from "@/components/tourCard";
//

const FeaturedTours = ({ tours }) => {
  const theme = useTheme();

  const isMdUp = useResponsive("up", "md");

  const carouselRef = useRef(null);

  const carouselSettings = {
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === "rtl"),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ md: "flex-end" }}
        sx={{
          textAlign: { xs: "center", md: "unset" },
        }}
      >
        <Stack spacing={3} flexGrow={1}>
          <Typography variant="h2">Featured Tours</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Some of Most Demand tour Integrations.
          </Typography>
        </Stack>

        {isMdUp && (
          <CarouselArrows spacing={2} onNext={handleNext} onPrev={handlePrev} />
        )}
      </Stack>

      <Box
        sx={{
          position: "relative",
          ml: { md: -2 },
          width: { md: "calc(100% + 32px)" },
        }}
      >
        <CarouselArrows
          onNext={handleNext}
          onPrev={handlePrev}
          leftButtonProps={{
            sx: {
              left: -16,
              opacity: 1,
              color: "common.white",
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
              ...(isMdUp && { display: "none" }),
            },
          }}
          rightButtonProps={{
            sx: {
              right: -16,
              opacity: 1,
              color: "common.white",
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
              ...(isMdUp && { display: "none" }),
            },
          }}
        >
          <Carousel ref={carouselRef} {...carouselSettings}>
            {tours.map((tour) => (
              <Box
                key={tour.tourId}
                sx={{
                  px: 2,
                  pt: { xs: 8, md: 10 },
                  pb: { xs: 10, md: 15 },
                }}
              >
                <TourItemCard tour={tour} vertical />
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>
    </Container>
  );
};

export default FeaturedTours;
