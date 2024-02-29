"use server";

import { cookies } from "next/headers";

import axios from "axios";

const apiRequest = async ({ url, method = "GET", data, headers = {} }) => {
  const axiosConfig = {
    url: "/api/company/" + url,
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    data,
  };

  return new Promise((resolve, reject) => {
    axios(axiosConfig)
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        reject({
          message:
            error?.response?.data?.error ||
            error?.error ||
            error?.message ||
            "Something went wrong",
          status: error?.response?.status,
        });
      });
  });
};

export const login = async (data) => {
  try {
    const resonse = await apiRequest({
      url: "login",
      method: "POST",
      data,
    });
    return resonse;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const register = async (data) => {
  return await apiRequest({
    url: "register",
    method: "POST",
    data,
  });
};

export const get_profile = async () => {
  return await apiRequest({
    url: "getprofile",
    method: "GET",
  });
};

export const update_password = async (data) => {
  return await apiRequest({
    url: "updatePassword",
    method: "POST",
    data,
  });
};

export const update_profile = async (data) => {
  return await apiRequest({
    url: "updateProfile",
    method: "POST",
    data,
  });
};

export const clearAllCookies = async () => {
  return await apiRequest({
    url: "logout",
    method: "GET",
  });
};

export const deleteCookie = () => {
  cookies().delete("token");
};
