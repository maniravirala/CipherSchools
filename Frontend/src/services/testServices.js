import axios from "axios";

const API_URL = "http://localhost:8000/api";

// Function to get available tests

const getAvailableTests = async () => {
  try {
    const response = await axios.get(`${API_URL}/tests`, {
      withCredentials: true,
      credentials: "include",
    });
    return response.data;
  } catch (error) {
    throw (
      error.response.data.message || "An error occurred while fetching tests"
    );
  }
};
