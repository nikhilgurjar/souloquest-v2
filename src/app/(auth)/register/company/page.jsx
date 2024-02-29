import React from "react";
import { Link, Stack, Divider, Typography, Box } from "@mui/material";
// components
import Logo from "@/components/logo";
import { StyledBox } from "../../styles";
import LoginRightPane from "../../LoginRightPane";
import NextLink from "next/link";
import CompanyRegisterForm from "../components/CompanyRegisterForm";

const CompanyRegister = () => {
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

        <CompanyRegisterForm role="user" />
      </StyledBox>
      <LoginRightPane />
    </Stack>
  );
};

export default CompanyRegister;
