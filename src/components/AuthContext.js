import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (newToken, newUserName, newUserId) => {
    setToken(newToken);
    setUserName(newUserName);
    setUserId(newUserId);
    localStorage.setItem("token", newToken);
    localStorage.setItem("userName", newUserName);
    localStorage.setItem("userId", newUserId);
  };

  const logout = () => {
    setToken(null);
    setUserName(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
  };
  console.log("AuthContext token:", token);
  console.log("AuthContext userName:", userName);
  console.log("AuthContext userId:", userId);
  return (
    <AuthContext.Provider value={{ token, userName, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
