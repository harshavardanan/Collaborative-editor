import React, { useState, useEffect } from "react";
import TextEditor from "./TextEditor";
import { io, Socket } from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

interface SocketConfigProps {
  userData: any;
  roomName: string;
}

const SocketConfig: React.FC<SocketConfigProps> = ({ userData, roomName }) => {
  const [editorData, setEditorData] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!userData?.displayName || !roomName) return;

    // Initialize the socket connection
    const newSocket = io(ENDPOINT, { transports: ["websocket"] });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");

      // Emit join-room event
      newSocket.emit("join-room", {
        name: userData.displayName,
        room: roomName,
      });

      // Listen for real-time updates
      newSocket.on("editing", (data: string) => {
        console.log("Data received from server:", data);
        setEditorData(data);
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userData?.displayName, roomName]);

  // Send text updates to the server
  const sendChanges = (data: string) => {
    console.log("Sending data to server:", data);
    if (socket) {
      socket.emit("editing", { room: roomName, data });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 w-full max-w-3xl p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-indigo-400 text-center mb-4">
          Collaborative Editor - Room: {roomName}
        </h2>
        <TextEditor editorData={editorData} setEditorData={sendChanges} />
      </div>
    </div>
  );
};

export default SocketConfig;
