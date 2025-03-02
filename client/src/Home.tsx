import React, { useState, useEffect } from "react";
import SocketConfig from "./components/SocketConfig";

export default function Home() {
  const [roomName, setRoomName] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);
  const [joinedRoom, setJoinedRoom] = useState<boolean>(false);

  const getRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const joinRoom = () => {
    if (!roomName || !userData?.displayName) return;
    setJoinedRoom(true);
    console.log("Joining Room:", roomName);
  };

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

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 ">
      {joinedRoom ? (
        <SocketConfig userData={userData} roomName={roomName} />
      ) : (
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 text-center">
          <h1 className="text-3xl font-bold mb-4 text-indigo-400">Welcome!</h1>
          <p className="text-gray-300 mb-6">
            {userData ? `Hello, ${userData.displayName}!` : "Loading user..."}
          </p>
          <input
            type="text"
            placeholder="Enter room number"
            name="roomName"
            value={roomName}
            onChange={getRoomName}
            autoComplete="off"
            className="w-full px-4 py-2 text-center text-white-900 rounded-lg focus:ring-2 focus:ring-indigo-400 "
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
