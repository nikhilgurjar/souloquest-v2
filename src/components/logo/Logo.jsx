import { forwardRef } from "react";
// next
import NextLink from "next/link";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, Link } from "@mui/material";
const Logo = forwardRef(
  ({ disabledLink = false, primaryBackground = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const logo = (
      <Box
        component="img"
        src="/assets/logo_png.png" // => Your path in public folder
        sx={{
          width: 90,
          height: 40,
          cursor: "pointer",
          ...sx,
        }}
      />
    );

    const primary_background_logo = (
      <Box
        component="img"
        src="/assets/logo_primary_png.png" // => Your path in public folder
        sx={{
          width: 90,
          height: 40,
          cursor: "pointer",
          ...sx,
        }}
      />
    );
    if (disabledLink) {
      return logo;
    }
    return (
      <Link component={NextLink} href="/" sx={{ display: "contents" }}>
        {primaryBackground ? primary_background_logo : logo}
      </Link>
    );
  }
);

Logo.displayName = "SouloQuestLogo";
export default Logo;
