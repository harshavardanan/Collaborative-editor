import { useState, useEffect } from "react";
import { auth } from "./components/FirebaseConfig";
import { User } from "firebase/auth"; // Import User type from Firebase
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SocketConfig from "./components/SocketConfig";

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center items-center h-full">
        {user ? <SocketConfig /> : <SignIn />}
      </div>
    </div>
  );
}
