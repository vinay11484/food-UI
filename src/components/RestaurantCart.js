import { CDN_URL } from "../utils/constant";

const RestaurantCart = (props) => {
  const { resData } = props;
  const { name, cuisines, costForTwo, avgRating, cloudinaryImageId } =
    resData?.info;
  return (
    <div className="res-cart">
      <img
        className="rounded-4xl h-55.5 w-full pb-0"
        src={CDN_URL + cloudinaryImageId}
      />
      <div className="food-dis">
        <div className="p-2 pl-5">
          <div className="text-lg font-medium">{name}</div>
          <div>{cuisines.join(", ")}</div>
          <div>{costForTwo}</div>
          <div>{avgRating}</div>
        </div>
      </div>
    </div>
  );
};

export const withPromotionLabel = (RestaurantCart) => {
  return (props) => {
    return (
      <div>
        <label className="label">Promoted</label>
        <RestaurantCart {...props} />
      </div>
    );
  };
};
export default RestaurantCart;
