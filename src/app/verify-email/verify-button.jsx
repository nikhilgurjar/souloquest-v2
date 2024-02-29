"use client";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import useApi from "@/actions/useCompanyApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "@/components/snackbar";

const VerifyButton = () => {
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `verify-email?token=${searchParams.get("token")}`
      );
      enqueueSnackbar("Email verified successfully");
      router.push("/login/company");
    } catch (error) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingButton
      fullWidth
      size="large"
      type="submit"
      variant="contained"
      loading={loading}
      onClick={handleClick}
    >
      Verify
    </LoadingButton>
  );
};

export default VerifyButton;
