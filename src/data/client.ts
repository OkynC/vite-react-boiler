import axios from "axios";

//import { getAuthInfo } from "@/helpers/jwt";

const axiosClient = axios.create({
  baseURL: "/",
  timeout: 60 * 1000,
});

// set the AUTH token for any request
axiosClient.interceptors.request.use(async (config) => {
  /*const { token } = await getAuthInfo();
  if (!token) {
    return Promise.reject(new Error("No token available"));
  }
  config.headers.Authorization = token ? `Bearer ${token}` : "";*/
  return config;
});

export const client = axiosClient;
