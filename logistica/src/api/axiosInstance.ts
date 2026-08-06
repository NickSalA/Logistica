import axios, { type AxiosError, type AxiosInstance } from "axios";
import type { ApiErrorResponse } from "@/types/api";

function getErrorMessage(error: AxiosError<ApiErrorResponse>) {
  return (
    error.response?.data?.message ||
    error.message ||
    "No pudimos completar la solicitud."
  );
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ApiErrorResponse>) =>
    Promise.reject(new Error(getErrorMessage(error))),
);

export async function apiPost<TResponse>(
  url: string,
  payload?: unknown,
): Promise<TResponse> {
  return axiosInstance.post<TResponse>(url, payload) as unknown as Promise<TResponse>;
}
