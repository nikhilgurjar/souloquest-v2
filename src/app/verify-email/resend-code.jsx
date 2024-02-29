"use client";
import Link from "@mui/material/Link";
import React, { useState } from "react";
import useApi from "@/actions/useCompanyApi";
import { useSearchParams } from "next/navigation";
import { useSnackbar } from "@/components/snackbar";

const ResendCode = () => {
  const [loading, setLoading] = useState(false);
  const api = useApi();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `resend?token=${searchParams.get("token")}`
      );
      enqueueSnackbar("Mail Sent plese check your mail box");
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };
  return (
    <Link
      variant="subtitle2"
      sx={{
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      Resend code
    </Link>
  );
};

export default ResendCode;
