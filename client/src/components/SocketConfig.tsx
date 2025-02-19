import React, { useState, useEffect } from "react";
import TextEditor from "./TextEditor";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

const SocketConfig = () => {
  const [editorData, setEditorData] = useState<string>("");
  

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.on("join-room", (room) => {
        console.log("Joined room", room);
      });
      socket.on("editing", (data: string) => {
        console.log("data received from server", data);
        setEditorData(data);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendChanges = (editorData: string) => {
    console.log("sending data to server", editorData);
    io(ENDPOINT).emit("editing", editorData);
  };

  return (
    <div>
      
      <TextEditor editorData={editorData} setEditorData={sendChanges} />
    </div>
  );
};

export default SocketConfig;
