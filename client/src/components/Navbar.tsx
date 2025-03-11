import React, { useState, useEffect } from "react";
import SignIn from "./SignIn";
import { ENDPOINT } from "../App";

const Navbar = () => {
  const [userData, setUserData] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch(`${ENDPOINT}/auth/user`, {
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
    window.open(`${ENDPOINT}/auth/google`, "_self");
  };

  const logout = () => {
    localStorage.clear(); // Clear localStorage
    fetch(`${ENDPOINT}/auth/logout`, {
      method: "GET",
      credentials: "include",
    })
      .then(() => {
        setUserData(null); // Reset user state
        window.location.href = "/"; // Redirect to home
      })
      .catch((err) => console.error("Logout failed:", err));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-gray-800 text-white p-4 relative">
      <div className="w-[80%] mx-auto flex items-center justify-between">
        <a href="/" className="text-2xl font-semibold">
          Home
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {userData ? (
            <>
              <img
                src={userData.picture}
                alt={userData.given_name}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold">{userData.given_name}</span>
              <button
                className="ml-4 px-3 py-1 bg-red-300 rounded hover:bg-red-600 transition"
                onClick={logout}
              >
                Logout
              </button>
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
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-4">
                <img
                  src={userData.picture}
                  alt={userData.given_name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold">{userData.given_name}</span>
              </div>
              <button
                className="w-full text-left px-3 py-1 bg-red-300 rounded hover:bg-red-600 transition"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="w-full text-left hover:text-blue-400"
              onClick={() => {
                setShowPopup(true);
                setIsMobileMenuOpen(false);
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
