import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ENDPOINT } from "./App";

export default function Home() {
  const [roomName, setRoomName] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${ENDPOINT}/auth/user`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("User not authenticated");
        return res.json();
      })
      .then((data) => setUserData(data))
      .catch((err) => {
        console.error("Error fetching user:", err);
        navigate("/login");
      });
  }, [navigate]);

  const createRoom = () => {
    if (!userData) {
      alert("Please log in to create a room.");
      navigate("/login");
      return;
    }
    const newRoomId = uuidv4();
    navigate(`/edit/${newRoomId}/${userData.displayName}`);
  };

  const joinRoom = () => {
    if (!roomName) {
      alert("Please enter a valid room key.");
      return;
    }
    if (!userData) {
      alert("Please log in to join a room.");
      navigate("/login");
      return;
    }
    navigate(`/edit/${roomName}/${userData.displayName}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 text-center">
        <button
          onClick={createRoom}
          className="w-full mb-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
        >
          Create New Room
        </button>
        <input
          type="text"
          placeholder="Enter room key"
          name="roomName"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          autoComplete="off"
          className="w-full px-4 py-2 text-center text-white bg-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-400"
        />

        {/* Join Room Button */}
        <button
          onClick={joinRoom}
          className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
        >
          JOIN ROOM
        </button>
      </div>
    </div>
  );
}
