"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/components/snackbar";

export default function useApi() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const api = axios.create({
    baseURL: "/api/company/",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        enqueueSnackbar("Please login first", { variant: "error" });
        router.push("/login/company");
      }
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.error ||
        error?.message ||
        "Something went wrong";

      enqueueSnackbar(message, { variant: "error" });
      return Promise.reject({
        message,
      });
    }
  );

  const makeRequest = async ({ url, method, data }) => {
    try {
      const response = await api({
        url,
        method,
        data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    get: (url) => makeRequest({ url, method: "GET" }),
    post: (url, data) => makeRequest({ url, method: "POST", data }),
    put: (url, data) => makeRequest({ url, method: "PUT", data }),
    delete: (url) => makeRequest({ url, method: "DELETE" }),
  };
}
