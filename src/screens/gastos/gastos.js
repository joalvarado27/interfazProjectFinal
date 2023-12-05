import { useState, useEffect } from 'react';
import './gastos.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useAuth } from '../auth/AuthContext';

function Gastos() {

    const [tip_id, setTip_id] = useState(0);
    const [tip_nombre, setTip_nombre] = useState("");
    const [editar, setEditar] = useState(false);
    const { nameUser } = useAuth();
    const [usuarioList, setUsuarioList] = useState([]);
    const [usuarioListHistorial, setUsuarioListHistorial] = useState([]);
    const [userRolRol, setUserRolRol] = useState("");

    useEffect(() => {
        // Obtener la lista de usuarios al montar el componente
        getGastos();
        getGastosHistorial();
        getUserRol();
    }, []);
  
    const add = () => {
      Axios.post("http://localhost:3001/createtipogasto", {
        tip_id:tip_id,
        tip_nombre:tip_nombre,
      }).then(() => {
        getGastos();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro de tipo de gasto Exitoso!</strong>",
          html: `<i>El tipo de gasto <strong>${tip_nombre}</strong> fue registrada con Exito</i>`,
          icon: 'success',
          timer: 5000
        })
      })
      .catch((error) => {
        console.log("Error en la solicitud ADD: ", error);
      });
    };
  
    const update = () => {
      Axios.put("http://localhost:3001/updatetipogasto", {
        tip_id:tip_id,
        tip_nombre:tip_nombre,
      }).then(() => {
        getGastos();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualizacion Exitosa!</strong>",
          html: `<i>El tipo de gasto <strong>${tip_nombre}</strong> fue actualizado con Exito</i>`,
          icon: 'success',
          timer: 5000
        })
      })
      .catch((error) => {
        console.log("Error en la solicitud UPDATE: ", error);
      });
    };
  
    const deleteEmple = (val) => {
  
      Swal.fire({
        title: "Estas seguro?",
        html: `<i>Quieres eliminar al tipo de gasto <strong>${val.tip_nombre}</strong>?</i>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarla'
      }).then((result) => {
        if (result.isConfirmed) {
          Axios.delete(`http://localhost:3001/deletetipogasto/${val.tip_id}`).then(() => {
            getGastos();
            limpiarCampos();
            Swal.fire(
              'Eliminado!',
              'El tipo de gasto ha sido eliminado',
              'success'
            );
          })
          .catch((error) => {
            console.log("Error en la solicitud DELETE: ", error);
          });
        }
      });
    };
  
    const limpiarCampos = () => {
      setEditar(false);
      setTip_id("");
      setTip_nombre("");
    };
  
    const editarEmpleado = (val) => {
      setEditar(true);
      setTip_id(val.tip_id);
      setTip_nombre(val.tip_nombre);
    };
  
    const getGastos = () => {
      Axios.get("http://localhost:3001/gettipogasto").then((response) => {
        setUsuarioList(response.data);
      })
      .catch((error) => {
        console.log("Error en la solicitud EDIT: ", error);
      });
    };

    const getGastosHistorial = () => {
      Axios.get("http://localhost:3001/getgastos").then((response) => {
        setUsuarioListHistorial(response.data);
      })
      .catch((error) => {
        console.log("Error en la solicitud EDIT: ", error);
      });
    };

    const getUserRol = () => {
      Axios.get(`http://localhost:3001/getroluser/${nameUser}`).then((response) => {
        setUserRolRol(response.data[0].nombre_rol)
      })
      .catch((error) => {
        console.log("Error en la solicitud EDIT: ", error);
      });
    };
  
    return (
      <div className='container'>
        
        <div className='card text-center containerGestionDepartamentos'>
          <div className='card-header text-bg-dark'>Gestion de Gastos</div>
        
          <div className='card-body'>
    
            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>Id del gasto: </span>
              <input type='text' onChange={(e) => {
                setTip_id(e.target.value);
                }} className='form-control' value={tip_id} placeholder='ID del nuevo gasto' aria-describedby='basic-addon1' />
            </div>
    
            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>Nombre del gasto: </span>
              <input type='text' onChange={(e) => {
                setTip_nombre(e.target.value);
                }} className='form-control' value={tip_nombre} placeholder='Nombre del nuevo gasto' aria-describedby='basic-addon1' />
            </div>
    
          </div>
          <div className='card-footer text-muted'>
            {
              editar ? 
              <div>
                <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                <button className='btn btn-danger m-2' onClick={limpiarCampos}>Cancelar</button>
              </div>
              :
              <button className='btn btn-success' onClick={add}>Registrar</button>
            }
          </div>
        </div>
        <table className='table table-striped'>
          <thead className='table-primary'>
            <tr>
              <th scope='col'>ID del gasto</th>
              <th scope='col'>Nombre del gasto</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              usuarioList.map((val, key) => {
                return (
                  <tr key={val.id}>
                    <th scope='row'>{val.tip_id}</th> 
                    <td>{val.tip_nombre}</td> 
                    <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" onClick={() => {
                          editarEmpleado(val);
                        }} className="btn btn-info">Editar</button>
                        <button type="button" onClick={() => {
                          deleteEmple(val)
                        }} className="btn btn-danger">Eliminar</button>
                      </div>
                    </td> 
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <h2>HISTORIAL DE GASTOS</h2>
        <table className='table table-striped'>
          <thead className='table-primary'>
            <tr>
              <th scope='col'>ID del gasto</th>
              <th scope='col'>Cantidad</th>
              <th scope='col'>Fecha</th>
              <th scope='col'>ID del tipo</th>
            </tr>
          </thead>
          <tbody>
            {
              usuarioListHistorial.map((val, key) => {
                return (
                  <tr key={val.id}>
                    <th scope='row'>{val.gas_id}</th> 
                    <td>{val.gas_cantidad}</td> 
                    <td>{val.gas_fecha}</td> 
                    <td>{val.tip_id}</td> 
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

export default Gastos;