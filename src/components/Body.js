import RestaurantCart, { withPromotionLabel } from "./RestaurantCart";
import restaurants from "../utils/mockData";
import { useState } from "react";
import { useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useInternetStatus from "../utils/useInternetStatus";
const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filterListOfRestaurant, setListOfFilterRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const PromotedRestaurantCart = withPromotionLabel(RestaurantCart);
  console.log("render", listOfRestaurant);
  useEffect(() => {
    console.log("useffect");
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://swiggy-api-hv3o.onrender.com/restaurants/list",
    );
    const jason = await data.json();
    console.log(data);
    setListOfRestaurant(
      jason?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
    setListOfFilterRestaurant(
      jason?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
  };
  const isOnline = useInternetStatus();
  console.log(isOnline);
  if (!isOnline) {
    return (
      <div>
        <h1>check your internet connection</h1>
      </div>
    );
  }
  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="search-button-container">
        <div className="serch-continer">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              const filterListOfRestaurant = listOfRestaurant.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase()),
              );
              setListOfFilterRestaurant(filterListOfRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filterList = listOfRestaurant.filter(
              (res) => res.info.avgRating > 4.4,
            );
            setListOfFilterRestaurant(filterList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {filterListOfRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={`/restaurant/${restaurant.info.id}`}
          >
            {restaurant.info.cuisines.length <= 2 ? (
              <PromotedRestaurantCart resData={restaurant} />
            ) : (
              <RestaurantCart resData={restaurant} />
            )}
          </Link>
        ))}
        {/* <RestaurantCart resData={resObj.restaurants[1]} /> */}
      </div>
    </div>
  );
};

export default Body;
