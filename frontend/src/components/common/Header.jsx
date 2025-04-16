import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@src/context/Auth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const { authenticated } = useAuth();

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/quiz.png" alt="Company Logo" className="h-8 mr-3" />
            <span className="text-2xl font-bold text-blue-600">VoteMaker</span>
          </div>

          {/* Desktop Navigation + Button */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Centered Nav Links */}
            <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Home
              </Link>
              <Link
                to="/Aboutus"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                About Us
              </Link>

              {/* Features Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-gray-700 hover:text-blue-600 font-medium"
                >
                  Features
                  {isDropdownOpen ? (
                    <ChevronUp className="ml-1 w-4 h-4" />
                  ) : (
                    <ChevronDown className="ml-1 w-4 h-4" />
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/features/quiz"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Create Quiz
                    </Link>
                    <Link
                      to="/features/survey"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Create Survey
                    </Link>
                    <Link
                      to="/features/poll"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Create Poll
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/Contactus"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Contact Us
              </Link>
            </nav>

            {/* Right-aligned Button */}
            <div className="ml-auto">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition duration-300">
                Create Account
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <Link
              to="#"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link
              to="#"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              About Us
            </Link>

            {/* Mobile Features Dropdown */}
            <div>
              <button
                onClick={toggleDropdown}
                className="flex items-center w-full py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                Features
                {isDropdownOpen ? (
                  <ChevronUp className="ml-1 w-4 h-4" />
                ) : (
                  <ChevronDown className="ml-1 w-4 h-4" />
                )}
              </button>

              {isDropdownOpen && (
                <div className="pl-4">
                  <Link
                    to="/features/quiz"
                    className="block py-2 text-gray-700 hover:text-blue-600"
                  >
                    Create Quiz
                  </Link>
                  <Link
                    to="/features/survey"
                    className="block py-2 text-gray-700 hover:text-blue-600"
                  >
                    Create Survey
                  </Link>
                  <Link
                    to="/features/poll"
                    className="block py-2 text-gray-700 hover:text-blue-600"
                  >
                    Create Poll
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="#"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              Contact Us
            </Link>

            <div className="border-t border-gray-200 my-2"></div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mt-2 transition duration-300">
              Create Account
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
