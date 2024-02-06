"use client";

//import styles from "@/app/page.module.css";

import Populate from "@/app/components/populate";
// import APILogin from "@/app/components/APILogin";
import BrowseCards from "@/app/components/BrowseCards"
// import UserCards from "@/app/components/UserCards";
import Cart from "@/app/components/Cart";
//import Link from "next/link";
import { useState } from "react";
// import { API_BASE } from "@/utils/api";

export default function Home() {
  const [populated, setPopulated] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [cartList, setCartList] = useState([]);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [userAToken, setUserAToken] = useState("");
  // const [userRToken, setUserRToken] = useState("");

  // const authenticate = async (username,password) => {
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
  //   localStorage.setItem('loggedInUser',username)
  //   localStorage.setItem('aToken',data.access)
  //   localStorage.setItem('rToken',data.refresh)

  // };
  //console.log(loggedInUser)
  const addCard = (cardName,cardPrice,cOwner) =>{
    //Check if they are not the owner of the card. 
    let logInUser = localStorage.getItem('loggedInUser')
    console.log(cOwner)
    console.log("logged in user:")
    console.log(logInUser)
    if(cOwner===logInUser){
      console.log("You can't add your own items to the cart")
    }else{
      setCartList(state =>[...state, [cardName,"  ", cardPrice]]);
    }
  }
  const deleteCard = (key) => {
    //remove item from the state based on
    setCartList([...cartList.slice(0, key), ...cartList.slice(key + 1)]);
  };
  
  // const [info, setInfo] = useState("");
  // const register = async ({username, password, email}) => {
  //   const res = await fetch(`${API_BASE}/register/`, {
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     method: "POST",
  //     body: JSON.stringify({username, password, email}),
  //   });
  //   const data = await res.json()
  //   setInfo(JSON.stringify(data))
  // }

  return (
    <main>
      <h1>Webshop</h1>
      <div>
        <p>Click Populate to repopulate the Database</p>
        <p>login through http://localhost:3000/login/</p>
        <p>sign up through http://localhost:3000/signup/ then login with your new account</p>
        <p>Change your password through http://localhost:3000/account/</p>
        <p>View your items and add new ones through http://localhost:3000/myitems/</p>
      </div>
        <br/>
        <Populate populated={populated} setPopulated={setPopulated}></Populate>
        <br/>
        {/* <BrowseCards cardList={cardList} cartList={cartList} setCartList={setCartList} setCardList={setCardList} addCard={addCard} populated={populated}></BrowseCards> */}
        <p>Notice: You might be automatically logged in as testuser0. If you are unable to add their cards to your cart</p>
        <BrowseCards cardList={cardList} cartList={cartList} setCartList={setCartList} setCardList={setCardList} addCard={addCard} populated={populated}></BrowseCards>

        <br/>
        {/* <APILogin username={username} setUsername={setUsername} password={password} setPassword={setPassword} userAToken={userAToken} 
        setUserAToken={setUserAToken} userRToken={userRToken} setUserRToken={setUserRToken} authenticate={authenticate} ></APILogin>
        <br/>
        <UserCards></UserCards>
        <br/> */}
        <h1>Cart</h1>
        <p>Click an item above to add to the cart you are unable to add your own items. Click the item in the cart to remove it</p>
        <Cart items={cartList} deleteHandler={deleteCard}></Cart>
    </main>
  );
}
