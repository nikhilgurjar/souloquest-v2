"use client";
import React, { useEffect, useState } from "react";
import NewTourForm from "../../NewTourForm";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useTours } from "../../components/TourContext";
import { useParams } from "next/navigation";
import { SkeletonProductDetails } from "@/components/skeleton";

const TourEdit = () => {
  const { tourId } = useParams();
  const { getTourDetailsById } = useTours();

  const [tour, setTour] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTourDetails = async () => {
      try {
        setLoading(true);
        const response = await getTourDetailsById(tourId);
        setTour(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getTourDetails();
  }, [tourId]);

  return (
    <Container maxWidth={"lg"}>
      <Box sx={{ mb: 5 }}>
        <Stack direction="row" alignItems="center">
          <Box sx={{ flexGrow: 1 }}>
            {/* HEADING */}
            <Typography variant="h4" gutterBottom>
              Edit Tour
            </Typography>
          </Box>
        </Stack>
      </Box>
      {loading ? (
        <SkeletonProductDetails />
      ) : (
        <NewTourForm isEdit={true} currentTour={tour} />
      )}
    </Container>
  );
};

export default TourEdit;
