"use client";
import { InputAdornment, InputBase } from "@mui/material";
import React from "react";
import { useTours } from "./TourContext";
import Iconify from "@/components/iconify";

const TravelFilterLocation = () => {
  const { setSearchString, searchString, loading } = useTours();

  const handleChange = (event) => {
    setSearchString(event.target.value);
  };

  return (
    <InputBase
      onChange={handleChange}
      fullWidth
      value={searchString}
      placeholder="Where we go?"
      startAdornment={
        <InputAdornment position="start">
          <Iconify
            icon="eva:map-fill"
            size={24}
            style={{ color: "text.disabled", mr: 1 }}
          />
        </InputAdornment>
      }
      sx={{ height: 44, typography: "subtitle1", color: "inherit" }}
      disabled={loading} // Optional: Disable input during mutation loading
    />
  );
};

export default TravelFilterLocation;
