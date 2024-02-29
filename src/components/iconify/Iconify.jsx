import { forwardRef } from "react";
// icons
import { Icon } from "@iconify/react";
// @mui
import { Box } from "@mui/material";
const Iconify = forwardRef(({ icon, width = 20, sx, ...other }, ref) => (
  <Box
    ref={ref}
    component={Icon}
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));

Iconify.displayName = "IconifyIconComponent";
export default Iconify;
