"use client";
import React from "react";
import { LocalizationProvider as MuiLocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

const DateProvider = ({ children }) => {
  return (
    <MuiLocalizationProvider dateAdapter={AdapterDateFns}>
      {children}
    </MuiLocalizationProvider>
  );
};

export default DateProvider;
