import React, { useState, useEffect } from "react";
import SocketConfig from "./components/SocketConfig";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [roomName, setRoomName] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);
  const [currentRoom, setCurrentRoom] = useState<{
    roomId: string;
    userName: string;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/auth/user", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("User not authenticated");
        return res.json();
      })
      .then((data) => setUserData(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  const createRoom = () => {
    if (!userData) {
      alert("Please log in to create a room.");
      return;
    }
    const roomId = uuidv4();
    setCurrentRoom({ roomId, userName: userData.displayName });
  };

  const joinRoom = () => {
    if (!roomName.trim()) {
      alert("Please enter a valid room name.");
      return;
    }
    if (!userData) {
      alert("Please log in to join a room.");
      return;
    }
    setCurrentRoom({ roomId: roomName, userName: userData.displayName });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      {currentRoom ? (
        <SocketConfig userData={userData} roomName={currentRoom.roomId} />
      ) : (
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
          <button
            onClick={joinRoom}
            className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
          >
            JOIN ROOM
          </button>
        </div>
      )}
    </div>
  );
}
