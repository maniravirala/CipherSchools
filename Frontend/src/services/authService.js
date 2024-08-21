import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

// Function to login user
export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true, credentials: "include" }
    );
    // Cookies.set("token", response.data.token, { expires: 7, sameSite: "Lax" });
    return response.data;
  } catch (error) {
    throw error.response.data.message || "An error occurred while logging in";
  }
};

// Function to register user
export const register = async (name, email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      {
        name,
        email,
        password,
      },
      {
        withCredentials: true,
        credentials: "include",
      }
    );

    // Cookies.set("token", response.data.token, { expires: 7, sameSite: "Lax" });
    return response.data;
  } catch (error) {
    throw (
      error.response.data.message ||
      "An error occurred while registering the user"
    );
  }
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
  const token = Cookies.get("token");
  return !!token;
};

// Function to logout user
export const logout = async() => {
  try {
    const response = await axios.get(`${API_URL}/auth/logout`, {
      withCredentials: true,
      credentials: "include",
    });
    return response.data
  } catch (error){
    throw(
      error.response.data.message ||
      "An error occured while logging out"
    )
  }
};
