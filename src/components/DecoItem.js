import { useState, useEffect } from "react";
import '../css/treeGrid.css';

export default function DecoItem({ buyItem }) {
  const [decoration, setDecoration] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5500/public/decoration.json")
      .then((response) => response.json())
      .then((data) => setDecoration(data))
      .catch((error) => console.error("Error ", error));
  }, []);

  const buyClick = (item) => {
    // we need to make the compare the points before executing buyItem
    // and show an alert for confirmation to buy
    buyItem(item); 
  };

  return (
    <div className="itemList">
      <div className="titleArea">
        <h2>Your Points : 100</h2>
        <h4>My Item &#62;</h4>
      </div>
      <ul className="DefaultItem">
        {decoration.map((item) => (
          <li key={item.id} onClick={() => buyClick(item)}>
            <img src={item.img} alt={item.deco_name} />
            <p>Points: <span>{item.points}</span></p>
          </li>
        ))}
      </ul>
      <ul className="myItemList">
        {/* If the item remove form tree, that item show here */}
      </ul>
    </div>
  );
}
