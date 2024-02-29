import React from "react";
import {
  Typography,
  Container,
  Paper,
  Button,
  Box,
  Unstable_Grid2 as Grid,
} from "@mui/material";
// components
import Iconify from "@/components/iconify";
import TextMaxLine from "@/components/text-max-line";
import { StyledPaper } from "./styles";

const categories = [
  { id: "1", name: "Adventure", tours: 150 },
  { id: "2", name: "Nature Exploration", tours: 120 },
  { id: "3", name: "Cultural Immersion", tours: 180 },
  { id: "4", name: "Urban Discoveries", tours: 100 },
  { id: "5", name: "Relaxation Retreats", tours: 90 },
  { id: "6", name: "Wildlife Encounters", tours: 80 },
  { id: "7", name: "Culinary Journeys", tours: 110 },
  { id: "8", name: "Historical Expeditions", tours: 130 },
  { id: "9", name: "Wellness Escapes", tours: 70 },
  { id: "10", name: "Family Adventures", tours: 140 },
  { id: "11", name: "Photography Tours", tours: 60 },
  { id: "12", name: "Spiritual Pilgrimages", tours: 50 },
];

const TopCategories = () => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        bgcolor: "background.neutral",
        py: { xs: 10, md: 15 },
      }}
    >
      <Container>
        <Grid
          container
          spacing={{ xs: 8, lg: 3 }}
          justifyContent={{ lg: "space-between" }}
        >
          <Grid
            xs={12}
            lg={4}
            sx={{
              textAlign: { xs: "center", lg: "unset" },
            }}
          >
            <Typography variant="h2">Featured Categories</Typography>

            <Typography sx={{ color: "text.secondary", mt: 2, mb: 5 }}>
              Discover diverse experiences tailored to your interests. From
              adrenaline-fueled adventures to tranquil escapes, explore our
              curated selection of travel categories for your next unforgettable
              journey.
            </Typography>

            <Button
              variant="contained"
              size="large"
              color="primary"
              endIcon={<Iconify icon="carbon:chevron-right" />}
            >
              Explore more
            </Button>
          </Grid>

          <Grid xs={12} lg={7}>
            <Box
              sx={{
                gap: 3,
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
              }}
            >
              {categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

function CategoryItem({ category }) {
  return (
    <StyledPaper>
      <TextMaxLine variant="h6" line={1} gutterBottom>
        {category.name}
      </TextMaxLine>

      <Typography variant="body2" sx={{ color: "text.disabled" }}>
        {category.tours} tours
      </Typography>
    </StyledPaper>
  );
}

export default TopCategories;
