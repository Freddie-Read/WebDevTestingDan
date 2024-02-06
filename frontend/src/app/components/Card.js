import Label from "./Label";
export default function Card(props) {
  const cStyle = {
    width: "300px",
    height: "200px",
    padding: "0",
    margin: "10px",
    filter: "drop-shadow(0px 0px 5px #666)",
  };
  //console.log(props)
  return (
    <div style={cStyle} onClick={() => props.clickHandler(props.cName, props.cPrice, props.cOwner)}>
      <Label lTag={props.cName}/>
      <Label lTag={props.cDescription}/>
      <Label lTag={props.cPrice}/>
      <Label lTag={props.cCreated}/>
      <Label lTag={props.cOwner}/>
    </div>
  );
}
