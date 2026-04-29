import axios from "axios";

export const apiAuth = axios.create({
  baseURL: "/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const generalApi = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
