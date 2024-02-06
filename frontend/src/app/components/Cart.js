export default function Cart(props) {
  console.log(props.items)
  return (
    <div style={{ backgroundColor: "lightgray", minWidth: "300px" }}>
      <h1>Cart: {props.items.length} items</h1>
      <div style={{ display: "block" }}>
        {props.items.map((c, k) => (
          <div key={k} onClick={() => props.deleteHandler(k)}>
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}
