import '../css/treeGrid.css';

export default function TreeArea({ selectItems }) {
  return (
    <div className="tree-area">
      <img
        src="http://127.0.0.1:5500/public/svg/Main-Tree.svg"
        alt="Main Tree"
      />
      <div className="tree-grid">
        {Object.keys(selectItems).map((key) => (
          <div key={key} id={key}>
            {selectItems[key] && (
              <img src={selectItems[key].img} alt={selectItems[key].deco_name} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
