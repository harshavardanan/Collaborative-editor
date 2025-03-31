import React from "react";
import { ENDPOINT } from "../App";

const SignIn = ({}) => {
  const signInWithGoogle = () => {
    window.open(`${ENDPOINT}/auth/google`, "_self");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div
        className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-4 text-center">Welcome Back</h2>
        <p className="text-gray-400 mb-6 text-center">
          Sign in to continue collaborating in real time.
        </p>

        <button
          className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md transition"
          onClick={signInWithGoogle}
        >
          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="Google Logo"
            className="w-6 h-6 mr-2"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
