import React, { useState, useEffect } from "react";
import SignIn from "./SignIn";

const Navbar = () => {
  const [userData, setUserData] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

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

  console.log(userData);
  const signInWithGoogle = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="bg-gray-800 text-white p-4 relative">
      <div className="w-[80%] mx-auto flex items-center justify-between">
        <a href="/" className="text-2xl font-semibold">
          Home
        </a>

        <div className="hidden md:flex space-x-6 text-white-900">
          {userData ? (
            <>
              <img
                src={userData.picture}
                alt={userData.given_name}
                className="w-5 h-5 mr-2"
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

        <div className="md:hidden">
          <button className="text-white">Menu</button>
        </div>
      </div>
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
