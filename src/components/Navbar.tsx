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
    <nav className="bg-white shadow-sm border-b-2 border-purplebrand">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-purplebrand via-bluebrand to-blue-400 bg-clip-text text-transparent text-2xl font-bold tracking-tight">CloudCompress</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-purplebrand hover:text-bluebrand font-semibold transition-colors">
              Home
            </Link>
            <Link to="/features" className="text-purplebrand hover:text-bluebrand font-semibold transition-colors">
              Features
            </Link>
            <Link to="/about" className="text-purplebrand hover:text-bluebrand font-semibold transition-colors">
              About
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-purplebrand hover:text-bluebrand font-semibold transition-colors">
                  Dashboard
                </Link>
                <Button variant="outline" className="border-purplebrand text-purplebrand font-semibold hover:bg-bluebrand/10 transition" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-purplebrand text-purplebrand hover:bg-bluebrand/10 font-semibold transition">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-purplebrand to-bluebrand text-white font-semibold hover:opacity-90 shadow-lg transition">
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
              className="text-purplebrand focus:outline-none"
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
                className="text-purplebrand hover:text-bluebrand font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/features"
                className="text-purplebrand hover:text-bluebrand font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/about"
                className="text-purplebrand hover:text-bluebrand font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              {userIsLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-purplebrand hover:text-bluebrand font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button variant="outline" className="border-purplebrand text-purplebrand font-semibold hover:bg-bluebrand/10 transition" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-purplebrand text-purplebrand hover:bg-bluebrand/10 font-semibold">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-purplebrand to-bluebrand text-white font-semibold hover:opacity-90 shadow-lg">
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
