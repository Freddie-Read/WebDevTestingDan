"use client"
import UserCards from "@/app/components/UserCards";

import { useEffect, useState } from "react";
import { API_BASE } from "@/utils/api";

export default function Home() {
    const [userName, setUserName] = useState("")

    useEffect(() => {
        if(localStorage?.getItem('loggedInUser'))
            setUserName(localStorage.getItem('loggedInUser')??'')
      }, []);
    const [newItem, setNewItem] = useState("")
    const addItem = async ({ItemName, Description, Price}) => {
    let User = localStorage.getItem('loggedInUser')

    const res = await fetch(`${API_BASE}/addItem/`, {
        headers: {
            "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ItemName, Description, Price, User}),
        });
        const data = await res.json()
        //need to check if this is correct
        setNewItem(JSON.stringify(data))
    }
    return(
        <div>
            <div>
                <h1>Add Item</h1>
                <h1>Fill in information and verify username is correct</h1>
                <label>
                    User Name:
                    <p>{userName}</p>
                </label>
                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target;
                    // @ts-ignore
                    const formData = new FormData(form);
                    const formJson = Object.fromEntries(formData.entries());
                    // @ts-ignore
                    addItem(formJson)
                    }}>

                    <label>
                    ItemName
                    <input
                        type="text"
                        name="ItemName"
                    />
                    </label>
                    <label>
                    Description
                    <input
                        type="text"
                        name="Description"
                    />
                    </label>
                    <label>
                    Price
                    <input
                        type="text"
                        name="Price"
                    />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <div>
                    <h2>New Item</h2>
                    <p>{newItem}</p>
                </div>
            </div>
            <p>After Creating a new item please press Get Cards for it to update. The new item will be at the end of the selection</p>
            <UserCards></UserCards>
        </div>
    )
}