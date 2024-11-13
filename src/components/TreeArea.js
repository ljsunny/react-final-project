import '../css/treeGrid.css';

export default function TreeArea({ decoItems, removeItem }) {
  const removeClick = (key) => {
    removeItem(key);
  }

  return (
    <div className="tree-area">
      <img
        src="http://127.0.0.1:5500/public/svg/Main-Tree.svg"
        alt="Main Tree"
      />
      <div className="tree-grid">
        {Object.keys(decoItems).map((key) => (
          <div key={key} id={key} onClick={() => removeClick(key)}>
            {decoItems[key] && (
              <img src={decoItems[key].img} alt={decoItems[key].deco_name} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
