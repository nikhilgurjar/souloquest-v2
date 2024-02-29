import axios from "axios";

const apiRequest = async ({ url, method = "GET", data, headers = {} }) => {
  const axiosConfig = {
    url: "/api/partnerfinder" + url,
    method,
    // headers: {
    //   'Content-Type': 'application/json',
    //   ...headers,
    // },
    data,
  };

  return new Promise((resolve, reject) => {
    axios(axiosConfig)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error?.response?.status == 401) {
          localStorage.setItem("from", window.location.pathname);
          window.location = "/login";
        }
        reject(
          error?.response?.data?.error ||
            error?.error ||
            error?.message ||
            "Something went wrong"
        );
      });
  });
};

export const fetchPartnerRequests = async ({ departureDate, location }) => {
  try {
    const data = await apiRequest({
      url: `?departureDate=${departureDate}&location=${location}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const fetchAllPartnerRequests = async () => {
  try {
    const data = await apiRequest({
      url: ``,
      method: "GET",
    });
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const postPartnerRequest = async ({
  departureDate,
  location,
  description,
  title,
}) => {
  try {
    const data = await apiRequest({
      url: "",
      method: "POST",
      data: { departureDate, location, description, title },
    });
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const joinaRoom = async ({ room_id }) => {
  try {
    const data = await apiRequest({
      url: `/joinroom?room_id=${room_id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getRooms = async () => {
  try {
    const data = await apiRequest({
      url: `/getrooms`,
      method: "GET",
    });
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
