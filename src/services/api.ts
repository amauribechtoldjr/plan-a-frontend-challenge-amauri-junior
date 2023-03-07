// const PARAM_API_KEY = `?api_key=${import.meta.env.VITE_API_KEY}`;
const BASE_URL = "https://api.themoviedb.org/3/";

import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: import.meta.env.VITE_API_KEY,
  },
});

async function get<T = unknown>(uri: string, options?: AxiosRequestConfig) {
  const { data } = await instance.get<T>(`${uri}`, {
    ...options,
  });

  return data;
}

async function post<T = unknown>(
  uri: string,
  body: any,
  options?: AxiosRequestConfig
) {
  const { data } = await instance.post<T>(`${uri}`, body, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
  });

  return data;
}

export { get, post };
