import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Home";
import { Toaster } from "react-hot-toast";
import SocketConfig from "./components/SocketConfig";

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <div className="min-h-screen flex flex-col bg-gray-900">
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
      </div>
    </Router>
  );
}
