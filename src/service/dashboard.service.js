import { generalApi } from "@/config/api";

export const getDashboardData = async () => {
  try {
    const response = await generalApi.get("/dashboard");
    return response.data;
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    throw error;
  }
};
