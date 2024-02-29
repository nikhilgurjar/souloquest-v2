import axios from "axios";

const apiRequest = async ({ url, method = "GET", data, headers = {} }) => {
  const axiosConfig = {
    url: "/api/company/tours/" + url,
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
        resolve(response.data);
      })
      .catch((error) => {
        reject(
          error?.response?.data?.error ||
            error?.error ||
            error?.message ||
            "Something went wrong"
        );
      });
  });
};

export const addTour = async (data) => {
  return await apiRequest({
    url: "add",
    method: "POST",
    data,
  });
};
