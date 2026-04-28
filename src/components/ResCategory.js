import React from "react";
import CategoryItemList from "./CategoryItemList";
const ResCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div>
      <div className="w-5/6 m-auto  items-center shadow-lg p-4 rounded-lg cursor-pointer">
        <div className="flex justify-between" onClick={handleClick}>
          <span>
            {data.title}({data.itemCards.length})
          </span>
          <span>⏬</span>
        </div>
        {showItems && <CategoryItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default ResCategory;
