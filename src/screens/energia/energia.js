import { useState, useEffect } from 'react';
import './energia.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAuth } from '../auth/AuthContext';

function Energia() {
  
    const [usuarioList, setUsuarioList] = useState([]);
    const { nameuser } = useAuth();

    useEffect(() => {
        // Obtener la lista de usuarios al montar el componente
        getDepartamento();
    }, []);
  
    const getDepartamento = () => {
      Axios.get("http://localhost:3001/getenergia").then((response) => {
        setUsuarioList(response.data);
      })
      .catch((error) => {
        console.log("Error en la solicitud EDIT: ", error);
      });
    }
  
    return (
      <div className='container'>
        <h1 className='titleEnergia'>PRODUCTOS PARA ENERGIA</h1>
        <table className='table table-striped'>
          <thead className='table-primary'>
            <tr>
              <th scope='col'>Fecha</th>
              <th scope='col'>Cantidad de Producto</th>
              <th scope='col'>Porcentaje energia</th>
              <th scope='col'>ID del producto</th>
              <th scope='col'>ID del area</th>
            </tr>
          </thead>
          <tbody>
            {
              usuarioList.map((val, key) => {
                return (
                  <tr key={val.id}>
                    <th scope='row'>{val.ene_fecha}</th> 
                    <td>{val.ene_cantidad_producto}</td> 
                    <td>{val.ene_porcentaje_energia}</td> 
                    <td>{val.pro_id}</td> 
                    <td>{val.are_id}</td> 
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <h1 className='titleEnergia'>HISTORIAL DE PRECIOS</h1>
        <ResponsiveContainer width='100%' height={300} aspect={2}>
            <AreaChart width={500} height={400} data={usuarioList} margin={{top:10,right:30,left:0,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="ene_fecha" />
                <YAxis />
                <Tooltip />
                <Area type='monotone' dataKey="ene_precio_mercado" stackId="1" stroke='#FF4C25' fill='#FF4C25' />
                <Area type='monotone' dataKey="ene_precio_venta" stackId="1" stroke='#79B06B' fill='#79B06B' />
            </AreaChart>
        </ResponsiveContainer>
        <table className='table table-striped'>
          <thead className='table-primary'>
            <tr>
              <th scope='col'>Fecha</th>
              <th scope='col'>Precio Mercado</th>
              <th scope='col'>Precio Venta</th>
              <th scope='col'>Energia Generada</th>
            </tr>
          </thead>
          <tbody>
            {
              usuarioList.map((val, key) => {
                return (
                  <tr key={val.id}>
                    <th scope='row'>{val.ene_fecha}</th> 
                    <td>{val.ene_precio_mercado}</td> 
                    <td>{val.ene_precio_venta}</td> 
                    <td>{val.ene_generada}</td> 
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

export default Energia;