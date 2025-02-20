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
    <div>
      <Navbar />
      <SignIn />
      {/* <div>{user ? <SocketConfig /> : <SignIn />}</div> */}
      <SocketConfig />
    </div>
  );
}
