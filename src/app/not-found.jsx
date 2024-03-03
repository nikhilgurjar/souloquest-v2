"use client"
import { m } from "framer-motion";
// next
import NextLink from "next/link";
// @mui
import { Box, Button, Typography } from "@mui/material";
// layouts
// import CompactLayout from "../layouts/compact";
// components
import { MotionContainer, varBounce } from "@/components/animate";
// assets
import { PageNotFoundIllustration } from "@/assets/illustrations";
// ----------------------------------------------------------------------
// Page404.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;
// ----------------------------------------------------------------------
export default function NotFound() {
  return (
    <Box
      component="main"
      sx={{
        py: 12,
        display: "flex",
        minHeight: "100vh",
        textAlign: "center",
        px: { xs: 2, md: 0 },
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        "&:before": {
          width: 1,
          height: 1,
          zIndex: -1,
          content: "''",
          opacity: 0.24,
          position: "absolute",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundImage: "url(/assets/background/overlay_4.jpg)",
        },
      }}
    >
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for.May be we are
            currently working on this feature. Check it out later!!.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button component={NextLink} href="/" size="large" variant="contained">
          Go to Home
        </Button>
      </MotionContainer>
    </Box>
  );
}
