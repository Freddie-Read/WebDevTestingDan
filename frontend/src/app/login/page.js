"use client"
import { useState } from "react";
import { API_BASE } from "@/utils/api";
import APILogin from "@/app/components/APILogin";

export default function Login(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userAToken, setUserAToken] = useState("");
  const [userRToken, setUserRToken] = useState("");

  const authenticate = async (username,password) => {
    const res = await fetch(`${API_BASE}/token/`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setUserAToken(data.access);
    setUserRToken(data.refresh);
    localStorage.setItem('loggedInUser',username)
    localStorage.setItem('aToken',data.access)
    localStorage.setItem('rToken',data.refresh)
  }
  return(
  <APILogin username={username} setUsername={setUsername} password={password} setPassword={setPassword} userAToken={userAToken} 
        setUserAToken={setUserAToken} userRToken={userRToken} setUserRToken={setUserRToken} authenticate={authenticate} ></APILogin>
  );
}