import { useNavigate } from "react-router-dom";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [expirationTime, setExpirationTime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const login = (data) => {
    setToken(data.access_token);
    setExpirationTime(data.expires_in);
    sessionStorage.setItem("token", data.access_token);
    navigate("/", { replace: true });
  };

  const logout = () => {
    setToken(null);
    setExpirationTime(null);
    sessionStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ token, expirationTime, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);