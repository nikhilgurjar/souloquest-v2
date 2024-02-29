"use client";
import { PATH_PAGE } from "@/utils/siteConfig";
import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import NextLink from "next/link";
// @mui
import { useSnackbar } from "@/components/snackbar";

import { LoadingButton } from "@mui/lab";
import { Stack, Link, IconButton, InputAdornment } from "@mui/material";
// routes
// components
import Iconify from "@/components/iconify";
import FormProvider, { RHFTextField } from "@/components/hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";
import { loginInCompany } from "@/redux/slices/tourCompany";
import { useDispatch } from "@/redux/store";
import useApi from "@/actions/useCompanyApi";

const AuthLoginForm = ({ role }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();
  const api = useApi();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("That is not an email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password should be of minimum 6 characters length"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      if (role === "company") {
        const res = await api.post("login", { email, password });
        dispatch(loginInCompany({ tourCompany: res.tourCompany }));
        enqueueSnackbar("Logined successfully!!");
        console.info(router);
        if (localStorage.getItem("from")) {
          localStorage.removeItem("from");
          router.push(localStorage.getItem("from"));
          return;
        }
        router.push("/dashboard");
      } else {
        signIn("credentials", {
          email: email,
          password: password,
          role,
          redirect: false,
          // callbackUrl: `${window.location.origin}/findPartner`,
        }).then(({ ok, error }) => {
          if (ok) {
            // router.push("/dashboard");
          } else {
            console.log(error);
            enqueueSnackbar("Credentials do not match!", { variant: "error" });
          }
        });
      }
      console.log("DATA", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      formProps={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        spacing={2.5}
        gap={2.5}
        alignItems="flex-end"
        justifyContent="center"
        sx={{
          width: "100%",
          maxWidth: "445px",
        }}
      >
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <Iconify
                    icon={showPassword ? "carbon:view" : "carbon:view-off"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Link
          component={NextLink}
          href={PATH_PAGE.FORGOT_PASSWORD}
          variant="body2"
          underline="always"
          color="text.secondary"
        >
          Forgot password?
        </Link>

        <LoadingButton
          fullWidth
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default AuthLoginForm;
