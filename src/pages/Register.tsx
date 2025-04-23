
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  // Handle registration using our AuthContext
  const handleRegister = async (values: Record<string, string>) => {
    setIsLoading(true);
    
    try {
      // Call our register function from context with name in metadata
      await signUp(values.email, values.password, { name: values.name });
      console.log("Registered successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
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
            <h1 className="text-3xl font-extrabold text-gray-900">Create your account</h1>
            <p className="mt-2 text-gray-600">
              Start compressing and storing your files securely
            </p>
          </div>
          
          <AuthForm 
            type="register"
            onSubmit={handleRegister}
            isLoading={isLoading}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
