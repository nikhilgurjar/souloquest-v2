"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { palette } from "./palette";
import { shadows } from "./shadows";
import { customShadows } from "./customShadows";
import ComponentsOverrides from "./overrides";
import typography from "./typography";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: palette,
  typography: typography,
  shape: { borderRadius: 8 },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  shadows: shadows,
  customShadows: customShadows,
});

theme.components = ComponentsOverrides(theme);

export default theme;
