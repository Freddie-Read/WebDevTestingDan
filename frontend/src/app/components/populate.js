import {useState} from "react";

export default function Populate(props){

    const [msg, setMsg] = useState();
    const populateClickHandler = async () => {
        const res = await fetch('http://127.0.0.1:8000/populate/', {
            })
        const info = await res.json()
        setMsg(info.message)
        console.log("info", info, String(info))
        props.setPopulated(true)
    }

    return <>
        <h2>Populate DB</h2>
        <button onClick={() => populateClickHandler()}>Populate DB</button>
        <div>Message: {msg} </div>
    </>
}