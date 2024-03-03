"use client";
import { PATH_PAGE } from "@/utils/siteConfig";
import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import NextLink from "next/link";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  Stack,
  Link,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
// routes
// components
import Iconify from "@/components/iconify";
import FormProvider, { RHFTextField } from "@/components/hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "@/redux/store";
import useApi from "@/actions/useCompanyApi";
import { useSnackbar } from "@/components/snackbar";
import { loginInCompany } from "@/redux/slices/tourCompany";

const CompanyRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const api = useApi();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10,12}$/, "Invalid phone number format (10-12 digits)"),
    address: Yup.string()
      .required("Address is required")
      .min(5, "Address must be at least 5 characters long"),
    instagramLink: Yup.string(),
      // .url("Invalid Instagram link format")
      // .matches(
      //   /(https?:\/\/)?(www\.)?instagram\.com\/\S+/,
      //   "Must be a valid Instagram URL"
      // ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Password's not match"),
  });

  const defaultValues = {
    name: "",
    instagramLink: "https://www.instagram.com/",
    address: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const { name, instagramLink, address, email, password, phoneNumber } =
        data;
      // await login({ email, password })
      const res = await api.post("register", {
        name,
        instagramLink,
        address,
        email,
        password,
        phoneNumber,
      });
      dispatch(loginInCompany({ tourCompany: res.tourCompany }));
      enqueueSnackbar("Successfully Registered. Please check your email");
    } catch (error) {
      enqueueSnackbar(
        error || error.error || error.message || "Something went wrong",
        { variant: "error" }
      );

      // reset();
      // const message = submitErrorHandler(error);
      setError("afterSubmit", {
        ...error,
        message: error.error || error.message,
      });
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
      {errors.afterSubmit && (
        <Typography
          variant="body2"
          sx={{
            color: "error.dark",
            textAlign: "center",
            backgroundColor: "grey.300",
            p: 2,
            borderRadius: 2,
            marginBottom: 3,
            maxWidth: "420px",
          }}
        >
          {errors.afterSubmit?.message}
        </Typography>
      )}
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
        <RHFTextField name="name" label="Enter Name" />
        <RHFTextField name="email" label="Email address" type="email" />
        <RHFTextField name="phoneNumber" label="Company contact" type="tel" />
        <RHFTextField
          name="address"
          label="Company Address"
          type="tel"
          multiline
          rows={4}
        />

        <RHFTextField
          name="instagramLink"
          label="Instgram Account Link"
          type="text"
        />
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

        <RHFTextField
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "carbon:view" : "carbon:view-off"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default CompanyRegisterForm;
