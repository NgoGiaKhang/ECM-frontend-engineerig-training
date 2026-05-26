import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

import type { ApiErrorResponse } from "./types";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || "/api";
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;
export const CANCELED_ERRORS = ["CanceledError", "AbortError"] as const;
export const DEFAULT_ERROR_MESSAGE = "Something went wrong";
export const DEFAULT_ERROR_CODE = "UNKNOWN_ERROR";
export const REQUEST_CANCELED_CODE = "REQUEST_CANCELED";
class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_API_URL,
      timeout: API_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.response.use(
      (res) => res,
      (error: AxiosError<ApiErrorResponse>) => {
        // 1. Check if the request was intentionally canceled
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);

          return Promise.reject({
            status: 499, // 499 is standard shorthand for "Client Closed Request"
            message: error.message || CANCELED_ERRORS[0],
            code: REQUEST_CANCELED_CODE,
          });
        }

        // 2. Handle normal API error responses
        const status = error.response?.status;
        const data = error.response?.data;
        console.log(error);

        return Promise.reject({
          status: status ?? 0,
          message: data?.message ?? DEFAULT_ERROR_MESSAGE,
          code: data?.code ?? DEFAULT_ERROR_CODE,
        });
      },
    );
  }

  // GET
  async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.instance.get<T>(path, config);
    return res.data;
  }

  // POST
  async post<T>(
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const res = await this.instance.post<T>(path, data, config);
    return res.data;
  }

  // PUT
  async put<T>(
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const res = await this.instance.put<T>(path, data, config);
    return res.data;
  }

  // PATCH
  async patch<T>(
    path: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const res = await this.instance.patch<T>(path, data, config);
    return res.data;
  }

  // DELETE
  async delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.instance.delete<T>(path, config);
    return res.data;
  }
}

export const api = new HttpClient();
