import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/assets";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { isLoggedIn, handleLogin } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await handleLogin(email, password);
      localStorage.setItem("user", JSON.stringify(response.user));
      Cookies.set("token", response.token);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message || error);
      return;
    }
  };

  return (
    <div>
      <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-gray-700" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img src={Logo} alt="Logo" className="w-8 h-8 mr-2" />
            CipherSchools
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;CipherSchools has given me the tools to grow my skills
                with real-world projects and expert-led learning, shaping me
                into a confident developer.&rdquo;
              </p>
              <footer className="text-sm">Ravirala Mani</footer>
            </blockquote>
          </div>
        </div>
        <div>
          <motion.div
            className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password to log in
              </p>
            </div>
            <form onSubmit={login} className="space-y-4">
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
              <Input
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button className="w-full" type="submit">
                  Log in
                </Button>
              </motion.div>
            </form>
            <p className="px-8 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to={"/register"}
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign up
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
