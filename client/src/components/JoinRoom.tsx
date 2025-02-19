import React, { useState } from "react";
import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

const JoinRoom = () => {
  const [room, setRoom] = useState<string>("");
  const joinRoom = () => {
    io(ENDPOINT).emit("join-room", room);
  };
  return (
    <div>
      <input
        placeholder="Enter room number"
        onChange={(e) => setRoom(e.target.value)}
        value={room}
      />
      <button onClick={joinRoom}>Join</button>
    </div>
  );
};

export default JoinRoom;
