
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  // Handle login using our AuthContext
  const handleLogin = async (values: Record<string, string>) => {
    setIsLoading(true);
    
    try {
      // Call our login function from context
      await signIn(values.email, values.password);
      console.log("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      // Error is already handled in AuthContext with toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h1>
            <p className="mt-2 text-gray-600">
              Access your compressed files and storage
            </p>
          </div>
          
          <AuthForm 
            type="login"
            onSubmit={handleLogin}
            isLoading={isLoading}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
