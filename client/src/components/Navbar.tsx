import React, { useState, useEffect } from "react";
import { auth, signOut } from "./FirebaseConfig";
import JoinRoom from "./JoinRoom";

const Navbar = () => {
  const [user, setUser] = useState<any>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="w-[80%] mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">MyApp</div>
        <div className="hidden md:flex space-x-6">
          <a href="/login" className="hover:text-blue-400">
            Login
          </a>
        </div>
        <div className="md:hidden">
          <button className="text-white">Menu</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
