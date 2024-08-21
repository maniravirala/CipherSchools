import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

// Function to get available tests

const getToken =() =>{
  return localStorage.getItem('token');
}

export const getAvailableTests = async () => {
  try {
    const token = getToken()
    const response = await axios.get(`${API_URL}/test`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    const token = getToken()
    const response = await axios.get(`${API_URL}/test/${id}/start`, {
      headers:{
        Authorization: `Bearer ${token}`,
      },
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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