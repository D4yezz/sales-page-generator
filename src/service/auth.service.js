import { apiAuth } from "@/config/api";
import axios from "axios";

export const login = async (payload) => {
  try {
    const response = await apiAuth.post("/login", payload);
    return response.data;
  } catch (error) {
    console.error("Login service error:", error);

    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }

    return {
      status: false,
      pesan: "Network error",
    };
  }
};
export const register = async (payload) => {
  try {
    const response = await apiAuth.post("/register", payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return { status: false, pesan: "Network error" };
  }
};

export const getProfileUser = async () => {
  try {
    const response = await apiAuth.get("/profile");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          status: false,
          data: null,
          pesan: "Unauthorized",
        };
      }
      return error.response?.data;
    }

    return {
      status: false,
      data: null,
      pesan: "Network error",
    };
  }
};

export const logout = async () => {
  try {
    const response = await apiAuth.post("/logout");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return {
      status: false,
      pesan: "Network error",
    };
  }
};
