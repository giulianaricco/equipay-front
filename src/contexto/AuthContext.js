import React, { createContext, useContext, useState, useEffect } from 'react';
import { parseJwt } from '../utils/jwtUtils';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken || null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedToken);

  const processToken = (token) => {
    const decodedToken = parseJwt(token);
    let user = {}
    if (decodedToken) {
      user = {
        nombre: decodedToken.nombre,
        apellido: decodedToken.apellido,
        rol: decodedToken.rol,
        correo: decodedToken.sub,
      }
      setUser(user);
      localStorage.setItem("token", token);
    } else {
      console.error('Error al decodificar el token');
    }
    return user
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
    <AuthContext.Provider value={{ user, token, login, logout, getToken, isAuthenticated, processToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
