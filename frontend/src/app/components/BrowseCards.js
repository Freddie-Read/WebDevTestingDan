import { useEffect, useState } from 'react';
import Card from "@/app/components/Card";

export default function BrowseCards(props){
    const [search,setSearch] = useState("")

    useEffect(() => {
        fetchCards(search);
        console.log("updated")
    }, [props.populated]);

    
    const fetchCards = async (search) => {
        props.setCardList([]);
        console.log("searchName:", search);
        try {
          const response = await fetch('http://127.0.0.1:8000/api/cards?name='+search,{
          //   headers: {
          //     "Authorization": search,
          // },
              method: "GET",
          });
          const result = await response.json();
          const cListJSX = result.map((c, key) => {
              console.log("C: ", c.name);
              return <Card
                    cName={c.name}
                    cPrice={c.price}
                    cDescription={c.description}
                    cCreated={c.created}
                    cOwner={c.owner}
                    key={key}
                    clickHandler={props.addCard}
                    />});

          console.log("CARDS:" + cListJSX);
          props.setCardList(cListJSX);
        } catch (error) {
          console.error('Error fetching data:', error);
    }
  };
    return(<>
            <h2>Browse API (all cards, no authentication)</h2>
              <label>
                search
                <input
                  type="text"
                  name="searchName"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                </label>
                <button onClick={() => {
                  console.log("Name:"); 
                  console.log(search);
                  console.log();
                  fetchCards(search)}
                }>Search for items</button>
            <div>
              <p>You may need to scroll to see all items. Auto Generated Items are for testusers0, 1 and 2</p>
            </div>
            <div style={{display:"flex", paddingBottom:"30px"}}>
                {props.cardList}
            </div>
    </>
    )
}