import React, { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [google, setGoogle] = useState<string>("");

  const handleLogin = () => {
    console.log(email, password);
  };
  const signInWithGoogle = async () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="someone@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        >
          Sign In
        </button>

        <div className="text-center mb-4">Or sign in with</div>

        <div className="flex flex-col gap-4">
          <button
            className="w-full py-3 flex items-center justify-center bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={signInWithGoogle}
          >
            <i className="fab fa-google mr-2"></i> Sign in with Google
          </button>
          <button className="w-full py-3 flex items-center justify-center bg-gray-800 text-white rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800">
            <i className="fab fa-github mr-2"></i> Sign in with GitHub
          </button>
          <button className="w-full py-3 flex items-center justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
            <i className="fab fa-microsoft mr-2"></i> Sign in with Microsoft
          </button>
          <button className="w-full py-3 flex items-center justify-center bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black">
            <i className="fab fa-apple mr-2"></i> Sign in with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
