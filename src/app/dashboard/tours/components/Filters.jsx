// "use client";
import { Stack } from "@mui/material";
import React from "react";
import TravelFilterLocation from "./TravelFilterLocation";

const Filters = () => {
  // const { triggerFilteredSearch } = useTours();
  return (
    <Stack
      spacing={2.5}
      alignItems={{ md: "center" }}
      direction={{ xs: "column", md: "row" }}
      sx={{
        p: 4,
        borderRadius: 2,
        bgcolor: "background.neutral",
        mt: 5,
        mb: { xs: 5, md: 10 },
        maxWidth: "750px",
        mx: "auto",
      }}
    >
      <TravelFilterLocation />

      {/* <Button
        size="large"
        color="secondary"
        variant="contained"
        sx={{
          px: 0,
          flexShrink: 0,
          minWidth: { xs: 1, md: 48 },
        }}
        onClick={triggerFilteredSearch}
      >
        <Iconify icon="eva:search-outline" size={24} />
      </Button> */}
    </Stack>
  );
};

export default Filters;
