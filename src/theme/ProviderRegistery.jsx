import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme";
import DateProvider from "./DateProvider";
import { ReduxProvider } from "@/redux/Provider";
import SnackbarProvider from "@/components/snackbar/SnackbarProvider";

const ProviderRegistery = ({ children }) => {
  return (
    <DateProvider>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <ReduxProvider>
            <SnackbarProvider>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {children}
            </SnackbarProvider>
          </ReduxProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </DateProvider>
  );
};

export default ProviderRegistery;
