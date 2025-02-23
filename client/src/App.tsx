import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth } from "./components/FirebaseConfig";
import { User } from "firebase/auth"; // Import User type from Firebase
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import TextEditor from "./components/TextEditor";

import SocketConfig from "./components/SocketConfig";

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Route for Home page */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/" element={<TextEditor />} />
          <Route path="/socket" element={<SocketConfig />} />
        </Routes>
      </div>
    </Router>
  );
}
