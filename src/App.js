import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './screens/home/home';
import AdminUsers from './screens/adminUsers/adminUsers';
import Login from './screens/login/login';
import { useAuth } from './screens/auth/AuthContext';
import SideBar from '../src/components/sidebar'
import Areas from './screens/areas/areas';
import Departamentos from './screens/departamentos/departamentos';
import SolicitarProducto from './screens/solicitarProducto/solicitarProducto';
import Energia from './screens/energia/energia';
import Gastos from './screens/gastos/gastos';
import Privilegios from './screens/privilegios/privilegios';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <SideBar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/agregarusuario" element={<AdminUsers />} />
            <Route path="/privilegios" element={<Privilegios />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/departamentos" element={<Departamentos />} />
            <Route path="/solicitarProducto" element={<SolicitarProducto />} />
            <Route path="/gastos" element={<Gastos />} />
            <Route path="/energia" element={<Energia />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;

