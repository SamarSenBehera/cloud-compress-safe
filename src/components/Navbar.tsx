
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  isLoggedIn?: boolean;
}

const Navbar = ({ isLoggedIn: propIsLoggedIn }: NavbarProps) => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Use prop value if provided, otherwise use context value
  const userIsLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : isLoggedIn;
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-blue-600 text-2xl font-bold">CloudCompress</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/features" className="text-gray-700 hover:text-blue-600 font-medium">
              Features
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                  Dashboard
                </Link>
                <Button variant="outline" className="font-medium">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="font-medium">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/features"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              {userIsLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button variant="outline" className="font-medium" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full font-medium">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
