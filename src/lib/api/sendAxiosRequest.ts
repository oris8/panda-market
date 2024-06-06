import axios, { AxiosRequestConfig } from "axios";
import { getCookie, setCookie } from "cookies-next";
import { APP_BASE_URL } from "@/constants/common";

export const axiosInstance = axios.create({
  baseURL: APP_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use(function (config) {
  // 요청이 전달되기 전, 요청(config)에 대한 설정 작업
  const accessToken = getCookie("accessToken");

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getCookie("refreshToken");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await axiosInstance.post("/auth/refresh-token", {
          refreshToken: refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        setCookie("accessToken", newAccessToken);

        // 새로 발급된 accessToken으로 원래 요청을 다시 시도.
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

const sendAxiosRequest = async (options: AxiosRequestConfig) => {
  const client = axiosInstance({ ...options });
  await client;
  return client;
};

export default sendAxiosRequest;
