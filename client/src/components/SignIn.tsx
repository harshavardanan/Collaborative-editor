import React from "react";

const SignIn = ({ setShowPopup, signInWithGoogle }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setShowPopup(false)}
    >
      <div
        className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-80 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button (X) */}
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-white"
          onClick={() => setShowPopup(false)}
        >
          ✖
        </button>

        {/* Sign In Title */}
        <h2 className="text-center text-xl font-semibold mb-4">Sign In</h2>

        {/* Google Sign-In Button */}
        <button
          className="w-full flex items-center justify-center bg-white text-black py-2 rounded-md shadow-md hover:bg-gray-200"
          onClick={signInWithGoogle}
        >
          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="Google Logo"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
