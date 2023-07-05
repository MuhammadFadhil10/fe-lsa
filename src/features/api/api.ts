import axios from "axios";

export const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

Api.defaults.headers.common.Authorization = `Bearer ${localStorage?.getItem(
  "user-token"
)}`;

Api.interceptors.response.use(undefined, (err) => {
  if (err.response.status === 401) {
    window.location.href = "/";
  }

  return Promise.reject(err);
});

export const setAuthToken = (token: string) => {
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
};
