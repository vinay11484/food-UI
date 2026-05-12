import React, { captureOwnerStack } from "react";
import { useState } from "react";

const SignInForm = () => {
  const [registerMessage, setRegisterMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    fetch("http://localhost:3000/api/register-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, phone, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRegisterMessage(data.message);
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
    console.log("Username:", username);
    console.log("Phone:", phone);
    console.log("Password:", password);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Sign In
          </button>
        </div>
        {registerMessage && (
          <div className=" bg-green-200 pt-2 pb-2 mt-4 rounded font-medium text-center">
            {registerMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default SignInForm;
