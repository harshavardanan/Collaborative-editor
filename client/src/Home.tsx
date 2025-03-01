import React, { useState, useEffect } from "react";
import TextEditor from "./components/TextEditor";
import SocketConfig from "./components/SocketConfig";

export default function Home() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5000/auth/user", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("User not authenticated");
        return res.json();
      })
      .then((data) => setUserData(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  console.log(userData);
  return (
    <div>
      <h1>HOME</h1>
      <p>Welcome back, {userData?.displayName}</p>
      <SocketConfig />
    </div>
  );
}
