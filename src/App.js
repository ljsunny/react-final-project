import TreeArea from "./components/TreeArea";
import DecoItem from "./components/DecoItem";
import { useState } from "react";

function App() {
  const [decoItems, setDecoItems] = useState({
    "deco-item-1": null,
    "deco-item-2": null,
    "deco-item-3": null,
    "deco-item-4": null,
    "deco-item-5": null,
    "deco-item-6": null,
    "deco-item-7": null,
    "deco-item-8": null,
    "deco-item-9": null,
    "deco-item-10": null,
    "deco-item-11": null,
    "deco-item-12": null,
    "deco-item-13": null
  });

  const buyItem = (item) => {
    const myItemList = Object.keys(decoItems).find(
      (key) => decoItems[key] === null
    );

    if (myItemList) {
      setDecoItems((prevState) => ({
        ...prevState,
        [myItemList]: item,
      }));
    }
  };

  const removeItem = (key) => {
    setDecoItems((prevState) => ({
      ...prevState,
      [key]: null,
    }));
  };

  return (
  <>
    <TreeArea decoItems={decoItems} removeItem={removeItem}/>
    <DecoItem buyItem={buyItem}/>
  </>
  );
}

export default App;
