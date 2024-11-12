import TreeArea from "./components/TreeArea";
import DecoItem from "./components/DecoItem";
import { useState } from "react";

function App() {
  const [selectItems, setSelectItems] = useState({
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
    const myItemList = Object.keys(selectItems).find(
      (key) => selectItems[key] === null
    );

    if (myItemList) {
      setSelectItems((prevState) => ({
        ...prevState,
        [myItemList]: item,
      }));
    }
  };

  return (
  <>
    <TreeArea selectItems={selectItems}/>
    <DecoItem buyItem={buyItem}/>
  </>
  );
}

export default App;
