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

      // Fetch the current editor state when joining the room
      newSocket.emit("fetch-editor-state", { room: roomName });

      // Listen for real-time updates
      newSocket.on("editing", (data: string) => {
        console.log("Data received from server:", data);
        setEditorData(data);
      });

      // Listen for the current editor state when joining the room
      newSocket.on("editor-state", (data: string) => {
        console.log("Fetched editor state:", data);
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
    <div className="flex flex-col items-center justify-center h-[80] w-full bg-gray-900 ">
      <div
        className="bg-gray-800 w-full h-full rounded-lg shadow-lg overflow-hidden"
        style={{ maxHeight: "80vh" }}
      >
        <h2 className="text-2xl font-semibold text-indigo-400 text-center mb-4 sticky top-0 bg-gray-800 py-4 z-10">
          Collaborative Editor - Room: {roomName}
        </h2>
        <div className="p-6">
          <TextEditor editorData={editorData} setEditorData={sendChanges} />
        </div>
      </div>
    </div>
  );
};

export default SocketConfig;
