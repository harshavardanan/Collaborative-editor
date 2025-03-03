import React, { useState } from "react";
import SignIn from "./SignIn";

const Navbar = () => {
  const [user, setUser] = useState<any>();
  const [showPopup, setShowPopup] = useState(false);

  const signInWithGoogle = async () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="bg-gray-800 text-white p-4 relative">
      <div className="w-[80%] mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">MyApp</div>

        <div className="hidden md:flex space-x-6">
          <button
            className="hover:text-blue-400"
            onClick={() => setShowPopup(true)}
          >
            Login
          </button>
        </div>
        <div className="md:hidden">
          <button className="text-white">Menu</button>
        </div>
      </div>
      {/* Popup */}
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
