import axios from "axios";
import { API_ENDPOINTS, API_CONFIG } from "@/constants/baseUrl";
import { handleAxiosError } from "@/utils/axiosHelpers";

export const getAllProducts = async (page = 1, categoryId = null) => {
  try {
    const params = new URLSearchParams({ page: page.toString() });

    if (categoryId) {
      params.append("category_id", categoryId);
    }

    const url = `${API_ENDPOINTS.PRODUCTS.ALL}?${params.toString()}`;
    const { data } = await axios.get(url, API_CONFIG);

    return {
      data,
      error: null,
    };
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    return {
      data: null,
      error: errorMessage,
    };
  }
};
