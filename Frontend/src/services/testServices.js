import axios from "axios";

const API_URL = import.meta.env.VITE_API_KEY_URL;
console.log(API_URL);

// Function to get available tests

export const getAvailableTests = async () => {
  try {
    const response = await axios.get(`${API_URL}/test`, {
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

// Function to get a single test by ID
export const startTest = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/test/${id}/start`, {
      withCredentials: true,
      credentials: "include",
    });
    return response.data;
  } catch (error) {
    throw (
      error.response.data.message || "An error occurred while fetching test"
    );
  }
};


// Function to submit a test
export const submitTest = async (testId, selections) => {
  try {
    console.log(selections);
    const response = await axios.patch(
      `${API_URL}/submission/${testId}`,
      { selections },
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response.data.message || "An error occurred while submitting test"
    );
  }
};