import React from "react";
import { Link, Stack, Divider, Typography, Box } from "@mui/material";
// components
import Logo from "@/components/logo";
import { StyledBox } from "../styles";
import AuthWithSocial from "../AuthWithSocial";
import AuthLoginForm from "./AuthLoginForm";
import NextLink from "next/link";
import LoginRightPane from "../LoginRightPane";

const LoginPage = () => {
  return (
    <Stack direction="row" sx={{ minHeight: 1 }}>
      <StyledBox>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Logo />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`Login as a Tour Agency? `}
            <Link
              component={NextLink}
              href="/login/company"
              variant="subtitle2"
              color="secondary"
            >
              Tour Agency Login
            </Link>
          </Typography>
        </Stack>

        <Stack
          sx={{
            pb: 5,
            pt: { xs: 5, md: 6 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h3" paragraph>
            Login
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`Don’t have an account? `}
            <Link
              component={NextLink}
              href="/register"
              variant="subtitle2"
              color="primary"
            >
              Register Now!!
            </Link>
          </Typography>
        </Stack>

        <AuthWithSocial />

        <Divider sx={{ py: 3 }}>
          <Typography variant="body2" sx={{ color: "text.disabled" }}>
            OR
          </Typography>
        </Divider>

        <AuthLoginForm role="user" />
      </StyledBox>
      <LoginRightPane />
    </Stack>
  );
};

export default LoginPage;
