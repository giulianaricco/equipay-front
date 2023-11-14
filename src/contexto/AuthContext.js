import React, { createContext, useContext, useState, useEffect } from 'react';
import { parseJwt } from '../utils/jwtUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const decodedToken = parseJwt(token);
      console.log(decodedToken);
      if (decodedToken) {
        setUser({
          nombre: decodedToken.nombre,
          rol: decodedToken.rol,
        });
      } else {
        console.error('Error al decodificar el token');
      }
    } else {
      // Restablecer el usuario a null si no hay token
      setUser(null);
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');
  };

  // Nuevo método para obtener el token
  const getToken = () => {
    return token;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
