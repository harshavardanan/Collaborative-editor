import React, { useState, useEffect } from "react";
import TextEditor from "./TextEditor";
import { io, Socket } from "socket.io-client";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ENDPOINT = "http://localhost:5000";

const SocketConfig: React.FC = () => {
  const { roomName, username } = useParams<{
    roomName: string;
    username: string;
  }>();
  const [editorData, setEditorData] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const navigate = useNavigate();

  // Copy room name to clipboard
  const copyToClipboard = () => {
    if (roomName) {
      navigator.clipboard
        .writeText(roomName)
        .then(() => toast.success("Room key copied to clipboard."))
        .catch(() => toast.error("Failed to copy room key."));
    }
  };

  // Handle leaving the room
  const handleLeaveRoom = () => {
    if (socket) {
      socket.emit("leave-room", { name: username, room: roomName });
      socket.disconnect();
      navigate("/"); // Navigate back to home
    }
  };

  useEffect(() => {
    if (!username || !roomName) {
      toast.error("Invalid room or user information.");
      navigate("/");
      return;
    }

    const newSocket = io(ENDPOINT, { transports: ["websocket"] });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");

      // Emit join-room event
      newSocket.emit("join-room", { name: username, room: roomName });

      // Notify all users when someone joins
      newSocket.on("user-joined", ({ user }) => {
        toast.success(`${user} has joined the room.`);
      });

      // Notify all users when someone leaves
      newSocket.on("user-left", ({ user }) => {
        toast.error(`${user} has left the room.`);
      });

      // Fetch editor state
      newSocket.emit("fetch-editor-state", { room: roomName });

      // Handle real-time updates
      newSocket.on("editing", (data: string) => {
        setEditorData(data);
      });

      // Fetch current state
      newSocket.on("editor-state", (data: string) => {
        setEditorData(data);
      });
    });

    return () => {
      if (newSocket) {
        newSocket.emit("leave-room", { name: username, room: roomName });
        newSocket.disconnect();
      }
    };
  }, [username, roomName, navigate]);

  // Send text updates
  const sendChanges = (data: string) => {
    if (socket) {
      socket.emit("editing", { room: roomName, data });
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full bg-gray-900 h-screen overflow-hidden">
      <div className="w-full bg-gray-800 p-4 border-b border-gray-700 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-indigo-400">
            Room: {roomName}
          </h2>
          <button
            onClick={copyToClipboard}
            className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Copy Room Key
          </button>
          <button
            onClick={handleLeaveRoom}
            className="p-2 bg-red-400 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Leave Room
          </button>
        </div>
      </div>
      <TextEditor editorData={editorData} setEditorData={sendChanges} />
    </div>
  );
};

export default SocketConfig;
