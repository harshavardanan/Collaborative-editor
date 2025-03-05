import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { User } from "firebase/auth"; // Import User type from Firebase
import Navbar from "./components/Navbar";
import Home from "./Home";
import { Toaster } from "react-hot-toast";
import SocketConfig from "./components/SocketConfig";

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {}, []);

  return (
    <Router>
      {/* Global Toast Notifications */}
      <Toaster position="top-right" />

      {/* Full-page wrapper */}
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        {/* Navbar */}
        <Navbar />

        {/* Content Wrapper */}
        <div className="flex-grow flex items-center justify-center p-6">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
