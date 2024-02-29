"use client";
import { useState } from "react";
// @mui
import { Box } from "@mui/material";
import Header from "./nav/Header";
import NavVertical from "./nav/NavVertical";
import { HEADER, NAV } from "@/utils/siteConfig";
import useResponsive from "@/hooks/useResponsive";
const SPACING = 8;
export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useResponsive("up", "lg");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header onOpenNav={handleOpen} />

      <Box
        sx={{
          display: { lg: "flex" },
          minHeight: { lg: 1 },
        }}
      >
        <NavVertical openNav={open} onCloseNav={handleClose} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: `${HEADER.H_MOBILE + SPACING}px`,
            ...(isDesktop && {
              px: 2,
              py: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
              width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
            }),
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
