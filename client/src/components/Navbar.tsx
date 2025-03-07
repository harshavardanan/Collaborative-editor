import React, { useState, useEffect } from "react";
import SignIn from "./SignIn";

const Navbar = () => {
  const [userData, setUserData] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    fetch("http://localhost:5000/auth/user", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("User not authenticated");
        return res.json();
      })
      .then((data) => setUserData(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  const signInWithGoogle = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu
  };

  return (
    <div className="bg-gray-800 text-white p-4 relative">
      <div className="w-[80%] mx-auto flex items-center justify-between">
        <a href="/" className="text-2xl font-semibold">
          Home
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-white-900">
          {userData ? (
            <>
              <img
                src={userData.picture}
                alt={userData.given_name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="font-semibold">{userData.given_name}</span>
            </>
          ) : (
            <button
              className="hover:text-blue-400"
              onClick={() => setShowPopup(true)}
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700 p-4 mt-2">
          {userData ? (
            <div className="flex items-center space-x-4">
              <img
                src={userData.picture}
                alt={userData.given_name}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold">{userData.given_name}</span>
            </div>
          ) : (
            <button
              className="w-full text-left hover:text-blue-400"
              onClick={() => {
                setShowPopup(true);
                setIsMobileMenuOpen(false); // Close mobile menu when login is clicked
              }}
            >
              Login
            </button>
          )}
        </div>
      )}

      {/* Login Popup */}
      {showPopup && (
        <SignIn
          setShowPopup={setShowPopup}
          signInWithGoogle={signInWithGoogle}
        />
      )}
    </div>
  );
};

export default Navbar;
