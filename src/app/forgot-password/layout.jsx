import React from "react";
import Iconify from "@/components/iconify";
import { PasswordIcon } from "@/assets/icons";
import { Box, Card, Stack, Typography } from "@mui/material";
import Link from "next/link";
import MUILink from "@mui/material/Link";

const Resendlayout = ({ children }) => {
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
      <Card
        sx={{
          py: 5,
          px: 8,
          maxWidth: 420,
        }}
      >
        <PasswordIcon sx={{ height: 96 }} />

        <Stack
          spacing={3}
          gap={3}
          alignItems="center"
          direction={"column"}
          justifyContent={"center"}
          sx={{ width: 1 }}
        >
          {children}
          <MUILink
            component={Link}
            href={"/login/company"}
            color="inherit"
            variant="subtitle2"
            sx={{
              alignItems: "center",
              display: "inline-flex",
            }}
          >
            <Iconify icon="eva:arrow-ios-back-fill" width={16} />
            Return to sign in
          </MUILink>
        </Stack>
      </Card>
    </Box>
  );
};

export default Resendlayout;
