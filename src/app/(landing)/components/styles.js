"use client";
import { alpha, styled } from "@mui/material/styles";
import { bgGradient } from "@/utils/cssStyles";
import { Paper } from "@mui/material";

export const StyledRoot = styled("div")(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, 0.9),
    imgUrl: "/assets/background/overlay_1.jpg",
  }),
  overflow: "hidden",
}));

// = styled(Paper)(({ theme }) => ({
//   p: 3,
//   borderRadius: 1.5,
//   cursor: "pointer",
//   bgcolor: "transparent",

// }));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1.5),
  border: "1px solid rgba(145, 158, 171, 0.16)",
  cursor: "pointer",
  backgroundColor: "transparent",
  transition: theme.transitions.create("all", {
    duration: theme.transitions.duration.enteringScreen,
  }),
  "&:hover": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.customShadows.z24,
    "& h6": {
      color: theme.palette.primary.main,
    },
  },
}));
