"use client";
// import { useState } from "react";
// import { API_BASE } from "@/utils/api";
const APILogin = (props) => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [userAToken, setUserAToken] = useState("");
  // const [userRToken, setUserRToken] = useState("");

  // const authenticate = async () => {
  //   const res = await fetch(`${API_BASE}/token/`, {
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     method: "POST",
  //     body: JSON.stringify({ username, password }),
  //   });
  //   const data = await res.json();
  //   setUserAToken(data.access);
  //   setUserRToken(data.refresh);
  //   };

  return (
    <div>
      <h2>Login via API</h2>
        <label>
          Username
          </label>
          <input
            type="text"
            name="username"
            value={props.username}
            onChange={(e) => {
              props.setUsername(e.target.value);
            }}
          />

        <label>
          password
             </label>
          <input
            type="password"
            name="password"
            value={props.password}
            onChange={(e) => {
              props.setPassword(e.target.value);
            }}
          />

        <button onClick={() => {
          console.log("Authenticate");
          console.log(props.username);
          console.log();
          props.authenticate(props.username,props.password)}
        }>Login/get token</button>
      <div>Access Token:
        <div style={{fontSize:"10px"}} >
          {props.userAToken}
        </div>
      </div>
      <div>Refresh Token:
        <div style={{fontSize:"10px"}} >
          {props.userRToken}
        </div>
      </div>
    </div>
  )
};
export default APILogin;
