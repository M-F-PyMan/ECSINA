const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

export const API_CONFIG = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const API_ENDPOINTS = {
  PRODUCTS: {
    ALL: `${BASE_URL}/${API_VERSION}/Product`,
    SHOW: (id) => `${BASE_URL}/${API_VERSION}/Product/${id}`,
  },
  CATEGORIES: {
    ALL: `${BASE_URL}/${API_VERSION}/Category`,
  },
};
