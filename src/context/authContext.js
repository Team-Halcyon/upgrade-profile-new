'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; 
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null); 

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decoded = jwtDecode(storedToken);
      setUser(decoded);
      setToken(storedToken);
    }
  }, []);

  const login = (jwt) => {
    const decoded = jwtDecode(jwt);
    localStorage.setItem('token', jwt);
    setUser(decoded);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
