// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [nameUser, setNameUser] = useState('');

  const login = (nameuser) => {
    // Lógica para iniciar sesión (por ejemplo, verificar credenciales)
    setAuthenticated(true);
    setNameUser(nameuser);
  };

  const logout = () => {
    // Lógica para cerrar sesión
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, nameUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
