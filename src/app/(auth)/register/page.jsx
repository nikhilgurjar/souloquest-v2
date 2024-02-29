import React from "react";
import { Link, Stack, Divider, Typography, Box } from "@mui/material";
// components
import Logo from "@/components/logo";
import { StyledBox } from "../styles";
import AuthWithSocial from "../AuthWithSocial";
import NextLink from "next/link";
import LoginRightPane from "../LoginRightPane";
import AuthRegisterForm from "./components/RegisterForm";

const RegisterPage = () => {
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
            {`Register as tour agency? `}
            <Link
              component={NextLink}
              href="/register/company"
              variant="subtitle2"
              color="secondary"
            >
              Register
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
            Register
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`Already have a account? `}
            <Link
              component={NextLink}
              href="/login"
              variant="subtitle2"
              color="primary"
            >
              Login
            </Link>
          </Typography>
        </Stack>

        <AuthWithSocial />

        <Divider sx={{ py: 3 }}>
          <Typography variant="body2" sx={{ color: "text.disabled" }}>
            OR
          </Typography>
        </Divider>

        <AuthRegisterForm role="user" />
      </StyledBox>
      <LoginRightPane />
    </Stack>
  );
};

export default RegisterPage;
