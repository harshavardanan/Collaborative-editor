import React, { useState, useEffect } from "react";
import TextEditor from "./TextEditor";
import { io, Socket } from "socket.io-client";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ENDPOINT } from "../App";

const SocketConfig: React.FC = () => {
  const { roomName, username } = useParams<{
    roomName: string;
    username: string;
  }>();
  const [editorData, setEditorData] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const navigate = useNavigate();

  const copyToClipboard = () => {
    if (roomName) {
      navigator.clipboard
        .writeText(roomName)
        .then(() => toast.success("Room key copied to clipboard."))
        .catch(() => toast.error("Failed to copy room key."));
    }
  };

  const handleLeaveRoom = () => {
    if (socket) {
      socket.emit("leave-room", { name: username, room: roomName });
      toast.error("You have left the room.");
      socket.disconnect();
      navigate("/");
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

      newSocket.emit("join-room", { name: username, room: roomName });

      newSocket.on("user-joined", ({ user }) => {
        toast.success(`${user} has joined the room.`);
      });

      newSocket.on("user-left", ({ user }) => {
        toast.error(`${user} has left the room.`);
      });

      newSocket.emit("fetch-editor-state", { room: roomName });

      newSocket.on("editing", (data: string) => {
        setEditorData(data);
      });

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

  const sendChanges = (data: string) => {
    if (socket) {
      socket.emit("editing", { room: roomName, data });
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full bg-gray-900 h-screen overflow-hidden">
      <div className="w-full bg-gray-800 p-4 border-b border-gray-700 sticky top-0 z-50">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto gap-3">
          <h2 className="text-lg md:text-2xl font-semibold text-indigo-400 text-center md:text-left">
            Room: {roomName}
          </h2>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={copyToClipboard}
              className="p-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm md:text-base"
            >
              Copy Room Key
            </button>

            <button
              onClick={handleLeaveRoom}
              className="p-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm md:text-base"
            >
              Leave Room
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-full p-2 md:p-4 overflow-auto">
        <TextEditor editorData={editorData} setEditorData={sendChanges} />
      </div>
    </div>
  );
};

export default SocketConfig;
