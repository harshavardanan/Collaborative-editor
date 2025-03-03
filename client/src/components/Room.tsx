import React from "react";
import { useParams } from "react-router-dom";

const Room = () => {
  const { roomId } = useParams();
  return (
    <div>
      <h1>welcome to the room:{roomId}</h1>
    </div>
  );
};

export default Room;
