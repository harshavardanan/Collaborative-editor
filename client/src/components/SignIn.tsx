import {
  auth,
  googleProvider,
  appleProvider,
  githubProvider,
  signInWithPopup,
} from "./FirebaseConfig";
import { useState } from "react";

export default function SignIn() {
  const [user, setUser] = useState(auth.currentUser);

  const handleLogin = async (provider: any) => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md w-64 mx-auto">
      {user ? (
        <p>Welcome, {user.displayName}</p>
      ) : (
        <>
          <button
            onClick={() => handleLogin(googleProvider)}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => handleLogin(appleProvider)}
            className="bg-black text-white px-4 py-2 rounded mb-2"
          >
            Sign in with Apple
          </button>
          <button
            onClick={() => handleLogin(githubProvider)}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Sign in with GitHub
          </button>
        </>
      )}
    </div>
  );
}
