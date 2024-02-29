"use client";
import React from "react";
import Iconify from "@/components/iconify";
import { Stack } from "@mui/material";
import Link from "next/link";
import MUILink from "@mui/material/Link";
import FormProvider, { RHFTextField } from "@/components/hook-form";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "@/components/snackbar";
import useApi from "@/actions/useCompanyApi";
import { LoadingButton } from "@mui/lab";

const ResendVerificationEmail = () => {
  const { enqueueSnackbar } = useSnackbar();
  const api = useApi();

  const VerifySchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const defaultValues = {
    email: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await api.get(
        `verify-email/resend?email=${data?.email}`
      );
      enqueueSnackbar("Mail Sent plese check your mail box");

      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} alignItems="center">
        <RHFTextField
          name="email"
          label="Email"
          placeholder="example@gmail.com"
          InputLabelProps={{ shrink: true }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Resend Email
        </LoadingButton>

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
    </FormProvider>
  );
};

export default ResendVerificationEmail;
