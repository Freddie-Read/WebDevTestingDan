"use client";

//import styles from "@/app/page.module.css";
import { API_BASE } from "@/utils/api";
import { useState } from "react";

export default function Register() {
  const [info, setInfo] = useState("")
  const register = async ({username, password, email}) => {
    const res = await fetch(`${API_BASE}/register/`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({username, password, email}),
    });
    const data = await res.json()
    setInfo(JSON.stringify(data))
  }
  return (
    <div>
      <h1>Register Page</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target;
          // @ts-ignore
          const formData = new FormData(form);
          const formJson = Object.fromEntries(formData.entries());
          // @ts-ignore
          register(formJson)
        }}
      >
        <label>
          Username
          <input
            type="text"
            name="username"
          />
        </label>
        <label>
          email
          <input
            type="email"
            name="email"
          />
        </label>
        <label>
          password
          <input
            type="password"
            name="password"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>info</h2>
        <p>{info}</p>
      </div>
    </div>
  );
}
