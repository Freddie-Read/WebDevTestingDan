import { useEffect } from 'react';
import Card from "@/app/l11/components/Card";

export default function BrowseCards(props){

    useEffect(() => {
        fetchCards();
        console.log("updated")
    }, [props.populated]);

    
    const fetchCards = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/cards/');
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
            <div style={{display:"flex"}}>
                {props.cardList}
            </div>
    </>
    )
}