import { useState, useEffect } from "react";
import '../css/treeGrid.css';

export default function DecoItem({ buyItem, switchToMyItems,points }) {
  const [decoration, setDecoration] = useState([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/decoration.json`)
      .then((response) => response.json())
      .then((data) => setDecoration(data))
      .catch((error) => console.error("Error ", error));
  }, []);

  const buyClick = (item) => {
    const confirm = window.confirm(`if you click the "confirmation", your points reduce ${item.points}`)
    if (confirm){
      buyItem(item);
    }
  };

  return (
    <div className="itemList">
      <div className="titleArea">
        <h2>Your Points : {points}</h2>
        <h4 onClick={switchToMyItems}>My Item &#62;</h4>
      </div>
        <ul className="DefaultItem">
          {decoration.map((item) => (
            <li key={item.id} onClick={() => buyClick(item)}>
              <img src={`${process.env.PUBLIC_URL}/${item.img}`} alt={item.deco_name} />
              <p>Points: <span>{item.points}</span></p>
            </li>
          ))}
        </ul>
      
    </div>
  );
}
