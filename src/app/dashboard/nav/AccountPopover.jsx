"use client";
import { useEffect, useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import { Box, Divider, Typography, Stack, MenuItem } from "@mui/material";
// components
import { CustomAvatar } from "@/components/custom-avatar";
import { useSnackbar } from "@/components/snackbar";
import MenuPopover from "@/components/menu-popover";
import { IconButtonAnimate } from "@/components/animate";
import { PATH_PAGE } from "@/utils/siteConfig";
import { useRouter } from "next/navigation";
import { useCurrentCompany } from "@/hooks/useCurrentCompany";
import { SkeletonMailNavItem } from "@/components/skeleton";
import { deleteCookie } from "@/actions/companyAuth";
import { useDispatch } from "@/redux/store";
import { logOut } from "@/redux/slices/tourCompany";
// ----------------------------------------------------------------------
const OPTIONS = [
  {
    label: "Home",
    linkTo: PATH_PAGE.DASHBOARD,
  },
  {
    label: "Profile",
    linkTo: PATH_PAGE.PROFILE,
  },
];
// ----------------------------------------------------------------------
export default function AccountPopover() {
  const { company, loading } = useCurrentCompany();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [openPopover, setOpenPopover] = useState(null);
  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = () => {
    setOpenPopover(null);
  };
  const handleLogout = async () => {
    try {
      dispatch(logOut());
      localStorage.clear();
      await deleteCookie();
      router.replace(PATH_PAGE.HOME);
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };
  const handleClickItem = (path) => {
    handleClosePopover();
    router.push(path);
  };

  useEffect(() => {
    if (company) {
      setUser(company);
    }
  }, [company]);

  if (loading) {
    return <SkeletonMailNavItem />;
  }

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar
          src={user?.profilePic}
          alt={user?.name}
          name={user?.name}
        />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(option.linkTo)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
