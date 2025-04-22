import axios from "axios";
import { AUTH_TOKEN } from "../constants";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "API-KEY": process.env.REACT_APP_API_KEY,
  },
});

//interceptors ф-и перехватывающие запрос
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem(AUTH_TOKEN);
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
