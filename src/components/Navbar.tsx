
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Github } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "./Logo";

interface NavbarProps {
  isLoggedIn?: boolean;
}

const Navbar = ({ isLoggedIn: propIsLoggedIn }: NavbarProps) => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userIsLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : isLoggedIn;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar-blur sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 animate-float">
          <Logo size="md" />
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
            Home
          </Link>
          <Link to="/features" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
            Features
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
            About
          </Link>
          {userIsLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
                Dashboard
              </Link>
              <Button variant="outline" className="font-medium border-primary/40 text-primary hover:bg-primary/10 hover:text-white transition-all" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="font-medium border-primary/40 text-primary hover:bg-primary/10 hover:text-white transition-all">
                  Sign in
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-primary hover:bg-primary/80 text-white font-medium shadow-lg shadow-primary/40 card-hover">
                  Sign up
                </Button>
              </Link>
            </>
          )}
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 p-2 rounded-lg hover:bg-primary/10 transition"
            aria-label="GitHub"
          >
            <Github className="text-white" size={25} />
          </a>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in-up bg-[rgba(25,23,54,0.98)] rounded-lg mt-2 p-4 shadow-2xl border border-primary/10">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-foreground font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/features"
              className="text-foreground font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/about"
              className="text-foreground font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {userIsLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-foreground font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button variant="outline" className="font-medium border-primary/40 text-primary hover:bg-primary/10 hover:text-white" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full font-medium border-primary/40 text-primary hover:bg-primary/10 hover:text-white">
                    Sign in
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/80 text-white font-medium shadow-lg shadow-primary/40">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-auto px-2 rounded-lg hover:bg-primary/10 transition"
              aria-label="GitHub"
            >
              <Github className="text-white" size={25} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

