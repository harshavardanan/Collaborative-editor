import React, { useState, useEffect } from "react";
import TextEditor from "../TextEditor";
import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

const SocketConfig = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  }, [ENDPOINT]);
  return (
    <div>
      <TextEditor />
    </div>
  );
};

export default SocketConfig;
