"use client";
import { signIn } from "next-auth/react";
import Iconify from "@/components/iconify";
import { Button, Stack } from "@mui/material";
import React from "react";

const AuthWithSocial = () => {
  const handleGoogleLogin = () => {
    signIn("google", {
      redirect: false,
    }).then((result) => {
      console.log(result);
    });
  };
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <Button
        fullWidth
        size="large"
        color="inherit"
        variant="outlined"
        sx={{
          maxWidth: "452px",
        }}
        onClick={handleGoogleLogin}
      >
        <Iconify icon="logos:google-icon" width={"100%"} />
      </Button>
    </Stack>
  );
};

export default AuthWithSocial;
