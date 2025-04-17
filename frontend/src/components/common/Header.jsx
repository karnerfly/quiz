import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@src/context/Auth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

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

  const toggleAuthPopup = () => {
    setShowAuthPopup(!showAuthPopup);
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
                to="/about"
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
                to="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Contact Us
              </Link>
            </nav>

            {/* Right-aligned Button */}
            <div className="ml-auto">
              <button 
                onClick={toggleAuthPopup}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition duration-300"
              >
                Login
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

            <button 
              onClick={toggleAuthPopup}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mt-2 transition duration-300"
            >
              Login
            </button>
          </div>
        )}
      </div>

      {/* Authentication Popup with Blur Background */}
      {showAuthPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred background overlay */}
          <div 
            className="absolute inset-0 bg-white/30 backdrop-blur-sm"
            onClick={toggleAuthPopup}
          />
          
          {/* Popup content */}
          <div className="relative bg-white/90 backdrop-blur-md rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Welcome to VoteMaker</h3>
              <button 
                onClick={toggleAuthPopup}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">Please select your role to continue</p>
            
            <div className="space-y-4">
              <Link
                to="/auth/login"
                className="block bg-blue-100/80 hover:bg-blue-200/90 text-blue-800 font-medium py-3 px-4 rounded-lg transition-all duration-300 text-center"
                onClick={toggleAuthPopup}
              >
                Login as Student
              </Link>
              
              <Link
                to="/auth/login"
                className="block bg-green-100/80 hover:bg-green-200/90 text-green-800 font-medium py-3 px-4 rounded-lg transition-all duration-300 text-center"
                onClick={toggleAuthPopup}
              >
                Login as Teacher
              </Link>
            </div>
            
            <p className="text-center text-gray-500 mt-6">
              Don't have an account?{' '}
              <Link 
                to="/auth/signup" 
                className="text-blue-600 hover:underline"
                onClick={toggleAuthPopup}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      )}
    </header>
  );
}