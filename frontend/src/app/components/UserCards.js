import { useState } from 'react';
import Card from './Card';

export default function UserCards(){
    //need to grab the token from session storage?
    //const [aToken, setAToken] = useState(""); 
    const [cardList, setCardList] = useState([]);
    const [errorm, setErrorm] = useState("");
    const fetchCards = async () => {
        let aToken = localStorage.getItem('aToken')
        console.log("aToken:", aToken);
        setErrorm("");
        setCardList([]);
        try {
          const response = await fetch('http://127.0.0.1:8000/api/auth-cards/', {
                headers: {
                    "Authorization": "Bearer " + aToken,
                },
                method: "GET",
          });
          const result = await response.json();
          //console.log("result: ", result);
          if (result instanceof Array){
              const cListJSX = result.map((c, key) => {
                  //console.log("C: ", c.name);
                  return <Card
                        cName={c.name}
                        cPrice={c.price}
                        cDescription={c.description}
                        cCreated={c.created}
                        cOwner={c.owner}
                        key={key}
                        />});
              //console.log("CARDS:" + cListJSX);
              setCardList(cListJSX);
          }
          else setErrorm("Error: " + result.detail)
        } catch (error) {
          console.error('Error fetching data:', error.message);
          setErrorm(error.message)
    }
  };
    return(<>
            <h2>Get User Cards from API</h2>
            {/* <div> Access token: </div>
            <textarea
                  name="atoken"
                  value={aToken}
                  onChange={(e) => {
                            setAToken(e.target.value);
                    }}
            /> */}

            <button
                onClick={()=>{
                    fetchCards()
                }
                }>
                Get Cards</button>
            <div style={{display:"flex"}}>
                {cardList}
            </div>
            <div>{errorm}</div>
    </>
    )
}