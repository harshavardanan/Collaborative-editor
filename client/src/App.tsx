import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Home";
import { Toaster } from "react-hot-toast";
import SocketConfig from "./components/SocketConfig";
import SignIn from "./components/SignIn"; // Import SignUp component
import { useState, useEffect } from "react";

export const ENDPOINT = "http://localhost:5000";

export default function App() {
  const [userData, setUserData] = useState<any>(null);

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
      .catch(() => setUserData(null));
  }, []);

  return (
    <Router>
      <Toaster position="top-right" />
      <div className="min-h-screen flex flex-col bg-black">
        {/* Show Navbar only if user is logged in */}
        {userData ? (
          <>
            <Navbar />
            <div className="flex-grow flex items-center justify-center p-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/edit/:roomName/:username"
                  element={<SocketConfig />}
                />
              </Routes>
            </div>
          </>
        ) : (
          // Show SignUp page when not logged in
          <SignIn />
        )}
      </div>
    </Router>
  );
}
