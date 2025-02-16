import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/"; // 🔥 Fixed API path

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}register/`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_URL}token/`, userData);
};

// export const logoutUser = async (refreshToken) => {
//   return axios.post(`${API_URL}logout/`, { refresh: refreshToken });
// };

export const getItems = async (token) => {
  return axios.get(`${API_URL}items/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const toggleItem = async (token, id, packed) => {
  return axios.patch(
    `${API_URL}items/${id}/`,
    { packed },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const addItem = async (token, item) => {
  console.log("Sending item:", item);
  return axios.post(`${API_URL}items/`, item, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteItem = async (token, id) => {
  return axios.delete(`${API_URL}items/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
