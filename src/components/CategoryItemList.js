import React from "react";
import { useRef, useEffect } from "react";
import { CATALOG_API } from "../utils/constant";
import { useState } from "react";
import { useDispatch } from "react-redux";

const CategoryItemList = ({ items }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [buttonId, setButtonId] = useState(null);
  const [count, setCount] = useState(0);
  console.log("CategoryItemList rendered with items:", items);

  const toggleReadMore = () => setIsExpanded(!isExpanded);
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    console.log("Adding item to cart:", item);
    setCount(count + 1);

    dispatch({ type: "cart/addToCart", payload: item });
  };
  return (
    <div>
      {items.map((item) => (
        <div
          className="border-b-2 border-gray-300 py-2 text-left flex"
          key={item.card.info.id}
        >
          <div className="w-5/6 pr-6">
            <span>{item.card.info.name}</span>
            <span>
              {(item.card.info.defaultPrice || item.card.info.price) / 100}
            </span>
            <div className="flex gap-0 items-end ">
              <span
                className={`overflow-hidden -webkit-line-clamp-2 -webkit-box-orient-vertical ${selectedItemId === item.card.info.id && isExpanded ? "" : "line-clamp-2"}`}
              >
                {item.card.info.description}
              </span>
              <button
                className={`text-blue-500 hover:text-blue-700  `}
                onClick={() => {
                  setSelectedItemId(item.card.info.id);
                  toggleReadMore();
                }}
              >
                {isExpanded && selectedItemId === item.card.info.id
                  ? "Less"
                  : "More"}
              </button>
            </div>
          </div>

          <div className="w-1/5 ">
            <div className="absolute">
              <button
                onClick={() => {
                  handleAddItem(item);
                  setButtonId(item.card.info.id);
                }}
                className="bg-white font-bold text-green-700 px-4 py-2 rounded-lg ml-8 mt-22 border-2 border-gray-200 hover:bg-green-600 hover:text-white transition duration-300"
              >
                ADD+
                {count > 0 && buttonId === item.card.info.id && (
                  <span className="ml-1 text-sm bg-green-500 text-white rounded-full px-2">
                    {count}
                  </span>
                )}
              </button>
            </div>
            <img className="pb-5" src={CATALOG_API + item.card.info.imageId} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryItemList;
