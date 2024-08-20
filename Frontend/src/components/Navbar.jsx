import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { toast } from 'sonner';
// import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {

  // const navigate = useNavigate()
  const { isLoggedIn, handleLogout } = useAuth();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/");
  //   }
  // }, [isLoggedIn]);

  const logout = async (e) =>{
    e.preventDefault()
    try{
      if (isLoggedIn){
        const response = await handleLogout();
        toast.success(response.message);
      }
      else{
        toast.error('First Login to logout');
      }
    } catch(error){
      toast.error(error.message || error)
    }
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Test App</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
          <Link to="/register" className="text-gray-300 hover:text-white">Register</Link>
          <Link to="/" className="text-gray-300 hover:text-white">Dashboard</Link>
          <Link to="/permissions" className="text-gray-300 hover:text-white">Permissions</Link>
          <Link to="/test" className="text-gray-300 hover:text-white">Test</Link>
          <Link to="/finish" className="text-gray-300 hover:text-white">Finish Test</Link>
          <Button onClick={logout} className="text-gray-300 hover:text-white">Logout</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
