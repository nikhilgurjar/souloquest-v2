import axios from "axios";
const apiRequest = async ({ url, method = 'GET', data, headers = {} }) => {
    const axiosConfig = {
        url: '/api/user/'+url,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        data,
      };

    return new Promise((resolve, reject) => {
      axios(axiosConfig)
          .then(response => {
            console.log(response)
              resolve(response.data);
          })
          .catch(error => {
              console.log(error.response.data.error);
              reject(error?.response?.data?.error || error?.error || error?.message || 'Something went wrong');
          });
  });
  };

  export const sendResetPassword =async (email) =>{
    return await apiRequest({
        url: 'resetpassword',
        method: 'POST',
        data: { email },
      });
}

export const updatePassword = async ({oldPassword, password}) =>{
  return await apiRequest({
      url: 'updatepassword',
      method: 'POST',
      data: { old_password: oldPassword, new_password: password },
    });
}
export const updateProfile = async ({name, email, profilePic, phoneNumber, country, state, city, about}) =>{
  return await apiRequest({
    url: 'updateProfile',
    method: 'POST',
    data: { name, email, profilePic, phoneNumber, country, state, city, about },
  })
}

export const updateSocialLinks = async ({facebook, instagram, linkedin, twitter}) =>{
  return await apiRequest({
      url: 'updatesocialmedia',
      method: 'POST',
      data: { socialMedia: {facebook, instagram, linkedin, twitter}},
    });
}
export const getFriends = async (id) =>{
  return await apiRequest({
      url: 'friends',
      method: 'GET',
      data: { id },
    });
}

export const getReviewsPostedByUser = async (id) =>{
  return await apiRequest({
      url: 'reviews',
      method: 'GET',
      data: { id },
    });
}

export const getItenariesPostedByUser = async (id) =>{
  return await apiRequest({
      url: 'itenaries',
      method: 'GET',
      data: { id },
    });
}

export const login = async (data) =>{
  try {
      const resonse = await apiRequest({
        url: 'login',
        method: 'POST',
        data,
      });
      return resonse;
    }
    catch (error) {
      console.error('Error:', error);
      throw error;
    }
}

export const register = async (data) =>{
  return await apiRequest({
      url: 'register',
      method: 'POST',
      data,
    });
}


export const get_profile = async () =>{
  return await apiRequest({
    url: 'getprofile',
    method: 'GET'
  })
}

export const clearAllCookies = async () =>{
  return await apiRequest({
    url: 'logout',
    method: 'GET'
  })
};