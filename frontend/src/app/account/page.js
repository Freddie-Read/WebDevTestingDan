"use client"

import { useEffect, useState } from "react";
import { API_BASE } from "@/utils/api";

export default function Home() {
//   const [password, setPassword] = useState("")
//   const [newPassword, setNewPassword] = useState("")
    const [info,setInfo] = useState("")
    const [username, setUsername] = useState("")
    useEffect(() => {
        if(localStorage?.getItem('loggedInUser'))
            setUsername(localStorage.getItem('loggedInUser')??'')
      }, []);
    const updatePassword = async ({password, NewPassword}) => {
    const res = await fetch(`${API_BASE}/updatePassword/`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({username,password, NewPassword}),
    });
    const data = await res.json()
    //need to check if this is correct
    setInfo(JSON.stringify(data))
  }
    return(
        <div>
            <h1>Change Your Password</h1>
            <form
                onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                // @ts-ignore
                const formData = new FormData(form);
                const formJson = Object.fromEntries(formData.entries());
                // @ts-ignore
                updatePassword(formJson)
                }}
            >
                <label>
                Old Password
                <input
                    type="password"
                    name="password"
                />
                </label>
                <label>
                New password
                <input
                    type="password"
                    name="NewPassword"
                />
                </label>
                <button type="submit">Submit</button>
            </form>
            <div>
                <h2>info</h2>
                <p>{info}</p>
            </div>
        </div>
    )
}