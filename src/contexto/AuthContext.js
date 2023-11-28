import React, { createContext, useContext, useState, useEffect } from 'react';
import { parseJwt } from '../utils/jwtUtils';
import jwt_decode from "jwt-decode";
import cookies from "js-cookie";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken || null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedToken);

  const processToken = (token) => {
    const decodedToken = parseJwt(token);
    console.log(decodedToken);
    if (decodedToken) {
      setUser({
        nombre: decodedToken.nombre,
        rol: decodedToken.rol,
        correo: decodedToken.sub,
      });
      localStorage.setItem("token", token);
    } else {
      console.error('Error al decodificar el token');
    }
  };

  const login = (token) => {
    processToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Nuevo método para obtener el token
  const getToken = () => {
    return localStorage.getItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, getToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
