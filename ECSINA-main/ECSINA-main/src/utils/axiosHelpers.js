import axios from "axios";

export const handleAxiosError = (error) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    switch (status) {
      case 404:
        return "No results found.";
      case 401:
        return "Unauthorized access.";
      default:
        return `Server error: ${status}`;
    }
  }

  return "Unable to connect to the server.";
};
