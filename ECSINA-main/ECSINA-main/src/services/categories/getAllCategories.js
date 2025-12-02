import axios from "axios";
import { API_CONFIG, API_ENDPOINTS } from "@/constants/baseUrl";
import { handleAxiosError } from "@/utils/axiosHelpers";

export const getAllCategories = async () => {
  try {
    const { data } = await axios.get(API_ENDPOINTS.CATEGORIES.ALL, API_CONFIG);

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
