"use client";

import { Box, Stack, styled } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(5, 2),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(8, 10),
    maxWidth: 660,
  },
}));

export const StyledRoot = styled(Stack)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    width: 1,
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
  },
}));
