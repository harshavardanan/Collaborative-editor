import React, { useState } from "react";

const SignIn = ({ setShowPopup, signInWithGoogle, signInWithGitHub }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setShowPopup(false)}
    >
      <div
        className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-80 relative"
        onClick={(e) => e.stopPropagation()}
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
          className="w-full flex items-center justify-center bg-white text-black py-2 rounded-md mb-3 shadow-md hover:bg-gray-200"
          onClick={signInWithGoogle}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google Logo"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>

        {/* GitHub Sign-In Button */}
        <button
          className="w-full flex items-center justify-center bg-gray-700 text-white py-2 rounded-md shadow-md hover:bg-gray-600"
          onClick={signInWithGitHub}
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
            className="w-5 h-5 mr-2"
          />
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export default SignIn;
