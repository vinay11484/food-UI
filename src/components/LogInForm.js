import React from "react";
import { useState } from "react";
import { useAuth } from "./AuthContext";

const LogInForm = (props) => {
  const [userName, setUserName] = useState("");
  const { login } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    fetch("http://localhost:3000/api/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        login(data.token, data.user[0].user_name, data.user[0].user_id);
        setUserName(data.user[0].user_name);
        props.SetpanState({ isPaneOpen: false });
      })
      .catch((error) => {
        console.error("Error logging in user:", error);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            placeholder="Phone Number"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
      <div>{userName && <p>Welcome, {userName}!</p>} </div>
    </div>
  );
};

export default LogInForm;
