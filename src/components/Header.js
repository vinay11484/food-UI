import { LOGO_URL } from "../utils/constant";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useInternetStatus from "../utils/useInternetStatus";
import TimerContext from "../utils/TimerContext";
import { useSelector } from "react-redux";
const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const isOnline = useInternetStatus();
  const data = useContext(TimerContext);
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img className="logo-image" src={LOGO_URL} />
        </Link>
      </div>
      <div className="header-items">
        <ul>
          <li>{isOnline ? "\u2705" : "🔴"}</li>
          <li>
            <Link className="header-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="header-link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="header-link" to="/contact-us">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/cart" className="header-link">
              Cart - {cartItems.length}
            </Link>
          </li>
          <li className="login-container">
            <button
              className="login"
              onClick={() => {
                btnName === "Login"
                  ? setBtnName("Logout")
                  : setBtnName("Login");
              }}
            >
              {btnName}
            </button>
          </li>
          <li>{data.timer}</li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
