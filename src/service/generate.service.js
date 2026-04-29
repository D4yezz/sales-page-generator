import { generalApi } from "@/config/api";

export const generateSalesPage = async (productData) => {
  try {
    const response = await generalApi.post("/generate", productData);
    return response.data;
  } catch (error) {
    console.error("Error generating sales page:", error);
    throw error;
  }
};

export const saveSalesPage = async (pageData) => {
  try {
    const response = await generalApi.post("/sales-pages", pageData);
    return response.data;
  } catch (error) {
    console.error("Error saving sales page:", error);
    throw error;
  }
};

export const updateSalesPage = async (pageId, pageData) => {
  try {
    const response = await generalApi.put(`/sales-pages/${pageId}`, pageData);
    return response.data;
  } catch (error) {
    console.error("Error updating sales page:", error);
    throw error;
  }
};

export const fetchSalesPages = async () => {
  try {
    const response = await generalApi.get("/sales-pages");
    return response.data;
  } catch (error) {
    console.error("Error fetching sales pages:", error);
    throw error;
  }
};

export const getDetailPage = async (id) => {
  try {
    const response = await generalApi.get("/sales-pages" + `/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching detail sales pages:", error);
    throw error;
  }
};

export const deleteSalesPage = async (pageId) => {
  try {
    const response = await generalApi.delete(`/sales-pages?id=${pageId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting sales page:", error);
    throw error;
  }
};
