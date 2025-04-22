
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 max-w-md text-center mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link to="/">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Back to Home
          </Button>
        </Link>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
