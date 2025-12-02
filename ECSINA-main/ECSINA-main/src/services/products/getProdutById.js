import axios from "axios";
import { API_ENDPOINTS } from "@/constants/baseUrl";
import { handleAxiosError } from "@/utils/axiosHelpers";

export const getSingleProduct = async (id) => {
  try {
    const url = API_ENDPOINTS.PRODUCTS.SHOW(id);
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
