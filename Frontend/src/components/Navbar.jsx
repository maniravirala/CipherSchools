import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";
// import { useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  // const navigate = useNavigate()
  const { isLoggedIn, handleLogout } = useAuth();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/");
  //   }
  // }, [isLoggedIn]);

  const logout = async (e) => {
    e.preventDefault();
    try {
      if (isLoggedIn) {
        const response = await handleLogout();
        toast.success(response.message);
      } else {
        toast.error("First Login to logout");
      }
    } catch (error) {
      toast.error(error.message || error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-medium text-white">Exam Studio</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Dashboard
          </Link>
          {isLoggedIn ? (
            <Button
              onClick={logout}
              variant="secondary"
              className="text-gray-700 hover:text-white"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login" className="text-gray-300 hover:text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
