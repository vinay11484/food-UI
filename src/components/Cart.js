import React from "react";
import { useSelector } from "react-redux";
import CategoryItemList from "./CategoryItemList";
import { useRazorpay } from "react-razorpay";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum + (item.card.info.price || item.card.info.defaultPrice) / 100,
    0,
  );
  console.log("Cart rendered with items:", cartItems);
  const dispatch = useDispatch();
  const { Razorpay } = useRazorpay();
  const [orderData, setOrderData] = React.useState(null);
  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 500 }),
      });
      setOrderData(await response.json());
      console.log("Order data received:", orderData);
    } catch (error) {
      console.error("Error creating order:", error);
    }
    if (!orderData) {
      console.log("Order data is not available yet.");
      return;
    }
    const options = {
      key: "rzp_test_SeAwZV7ZcOPvTt",
      amount: orderData.amount,
      currency: orderData.currency || "INR",
      order_id: orderData.id,
      name: "Go4Food",
      handler: function (response) {
        console.log("Payment successful:", response);
        const paymentData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };
        fetch("http://localhost:3000/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        });
      },
      redirect: true,
      prefill: {
        email: "john.doe@example.com",
        contact: "9999999999",
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="w-3/6 m-auto  text-center shadow-lg p-4 rounded-lg">
      <h1 className="pb-5">Cart</h1>
      <button
        className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 mb-4 cursor-pointer"
        onClick={() => dispatch(clearCart())}
      >
        Clear Cart
      </button>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <CategoryItemList items={cartItems} />
          <h2 className="pt-4  font-bold">Total: ₹{totalAmount.toFixed(2)}</h2>
        </div>
      )}
      <button
        className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 mt-4 cursor-pointer"
        onClick={() => handlePayment()}
      >
        pay
      </button>
    </div>
  );
};

export default Cart;
