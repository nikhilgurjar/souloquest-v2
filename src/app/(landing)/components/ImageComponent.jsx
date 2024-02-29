"use client";
import Image from "@/components/image";
import useResponsive from "@/hooks/useResponsive";
import { Grid } from "@mui/material";
import React from "react";

const ImageComponent = () => {
  const isMdUp = useResponsive("up", "md");

  return (
    <>
      {isMdUp && (
        <Grid item xs={12} md={5}>
          {" "}
          {/* Ensure Grid is wrapped with <Grid item> */}
          <div style={{ width: "100%", maxWidth: "530px" }}>
            <Image
              visibleByDefault
              disabledEffect
              alt="marketing market"
              src="/assets/illustrations/landing.jpg"
            />
          </div>
        </Grid>
      )}
    </>
  );
};

export default ImageComponent;
