import React from "react";
import { Link, Stack, Typography, Box } from "@mui/material";
// components
import Logo from "@/components/logo";
import { StyledBox } from "../../styles";
import AuthLoginForm from "../AuthLoginForm";
import NextLink from "next/link";
import LoginRightPane from "../../LoginRightPane";

const LoginPage = () => {
  return (
    <Stack direction="row" sx={{ minHeight: 1 }}>
      <StyledBox>
        <Logo />

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
              href="/register/company"
              variant="subtitle2"
              color="primary"
            >
              Register Now!!
            </Link>
          </Typography>
        </Stack>

        <AuthLoginForm role="company" />
      </StyledBox>
      <LoginRightPane />
    </Stack>
  );
};

export default LoginPage;
