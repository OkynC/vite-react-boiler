import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/",
  timeout: 60 * 1000,
});

// set the AUTH token for any request
axiosClient.interceptors.request.use(async (config) => {
  /* Uncomment this to add any information in all axios requests
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  */
  return config;
});

export const client = axiosClient;
