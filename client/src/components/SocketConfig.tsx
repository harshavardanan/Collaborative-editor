import React, { useState, useEffect } from "react";
import TextEditor from "./TextEditor";
import { io, Socket } from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

interface socketConfigProps {
  userData: any;
  roomName: string;
}
const SocketConfig: React.FC<socketConfigProps> = ({ userData, roomName }) => {
  const [editorData, setEditorData] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    // Handle connection
    newSocket.on("connect", () => {
      console.log("Connected to server");

      newSocket.emit("join-room", {
        name: userData.displayName,
        room: roomName,
      });

      // Join a room (e.g., "room1")
      // newSocket.emit("join-room", {
      //   name: userData.displayName,
      //   room: roomName,
      // });

      // Listen for editing events
      newSocket.on("editing", (data: string) => {
        console.log("Data received from server:", data);
        setEditorData(data); // Update the editor content
      });
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [userData?.displayName, roomName]);

  // Send changes to the server
  const sendChanges = (data: string) => {
    console.log("Sending data to server:", data);
    if (socket) {
      socket.emit("editing", { room: roomName, data }); // Emit to the room
    }
  };

  return (
    <div>
      <TextEditor editorData={editorData} setEditorData={sendChanges} />
    </div>
  );
};

export default SocketConfig;
