import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { User } from "firebase/auth"; // Import User type from Firebase
import Navbar from "./components/Navbar";
import Home from "./Home";

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {}, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}
