import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

// Attach token automatically to each request
API.interceptors.request.use((req) => {
  const token = Cookies.get("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
}, (error) => {
  return Promise.reject(error);
});

// Optional: handle responses globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    // You can handle 401/403 globally here
    return Promise.reject(err);
  }
);

export default API;
