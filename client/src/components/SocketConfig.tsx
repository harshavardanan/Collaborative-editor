import React, { useState, useEffect } from "react";
import TextEditor from "./TextEditor";
import { io, Socket } from "socket.io-client";
import { toast } from "react-hot-toast"; // Import toast

const ENDPOINT = "http://localhost:5000";

interface SocketConfigProps {
  userData: any;
  roomName: string;
}

const SocketConfig: React.FC<SocketConfigProps> = ({ userData, roomName }) => {
  const [editorData, setEditorData] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!userData?.given_name || !roomName) return;

    // Initialize the socket connection
    const newSocket = io(ENDPOINT, { transports: ["websocket"] });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");

      // Emit join-room event
      newSocket.emit("join-room", {
        name: userData.given_name,
        room: roomName,
      });
      newSocket.on("user-joined", ({ user, message }) => {
        toast.success(`${user} has joined the room.`);
      });

      // Show toast message when a user joins
      toast.success(`${userData.given_name} has joined the room.`);

      // Listen for user disconnect
      newSocket.on("disconnect", () => {
        toast.error(`${userData.given_name} has left the room.`);
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
      // Emit leave-room event before disconnecting
      newSocket.emit("leave-room", {
        name: userData.given_name,
        room: roomName,
      });

      newSocket.disconnect();
    };
  }, [userData?.given_name, roomName]);

  // Send text updates to the server
  const sendChanges = (data: string) => {
    if (socket) {
      socket.emit("editing", { room: roomName, data });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80] w-full bg-gray-900">
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
