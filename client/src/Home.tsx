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
    else setJoinedRoom(true);

    console.log(roomName);
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
  }, [userData]);

  //console.log(userData);
  return (
    <div>
      {joinedRoom ? (
        <SocketConfig userData={userData} roomName={roomName} />
      ) : (
        <div>
          <h1>HOME</h1>
          <p>Welcome back, {userData?.displayName}</p>
          <input
            type="text"
            placeholder="Enter room number"
            name="roomName"
            value={roomName}
            onChange={getRoomName}
          />
          <button onClick={joinRoom}>JOIN ROOM</button>
        </div>
      )}
    </div>
  );
}
