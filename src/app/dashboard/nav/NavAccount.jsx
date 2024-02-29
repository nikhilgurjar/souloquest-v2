"use client";
// next
import NextLink from "next/link";
// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Link, Typography } from "@mui/material";
// components
import { CustomAvatar } from "@/components/custom-avatar";
import { PATH_PAGE } from "@/utils/siteConfig";
import { useCurrentCompany } from "@/hooks/useCurrentCompany";
// ----------------------------------------------------------------------
const StyledRoot = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));
// ----------------------------------------------------------------------
export default function NavAccount() {
  const { company: user, loading } = useCurrentCompany();
  return (
    <Link
      component={NextLink}
      href={PATH_PAGE.PROFILE}
      underline="none"
      color="inherit"
    >
      <StyledRoot>
        <CustomAvatar src={user?.avatar} alt={user?.name} name={user?.name} />

        <Box sx={{ ml: 2, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: "text.secondary" }}>
            {user?.role}
          </Typography>
        </Box>
      </StyledRoot>
    </Link>
  );
}
