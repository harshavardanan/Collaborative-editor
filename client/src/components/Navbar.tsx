import React, { useState, useEffect } from "react";
import { ENDPOINT } from "../App";

const Navbar = () => {
  const [userData, setUserData] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${ENDPOINT}/auth/user`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          console.error("User not authenticated");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      localStorage.clear();
      await fetch(`${ENDPOINT}/logout`, {
        method: "GET",
        credentials: "include",
      });

      setUserData(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
    </div>
  );
};

export default Navbar;
