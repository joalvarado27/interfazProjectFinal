import { useState, useEffect } from 'react';
import './departamentos.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useAuth } from '../auth/AuthContext';

function Departamentos() {

    const [dep_id, setDep_id] = useState(0);
    const [dep_nombre, setDep_nombre] = useState("");
    const [are_id, setAre_id] = useState(0);
    const [usu_id, setUsu_id] = useState(0);
    const [editar, setEditar] = useState(false);
    const [userRolRol, setUserRolRol] = useState("");
    const { nameUser } = useAuth();
  
    const [usuarioList, setUsuarioList] = useState([]);

    useEffect(() => {
        // Obtener la lista de usuarios al montar el componente
        getDepartamento();
        getUserRol();
    }, []);
  
    const add = () => {
      Axios.post("http://localhost:3001/createdepartamento", {
        dep_id:dep_id,
        dep_nombre:dep_nombre,
        are_id:are_id,
        usu_id:usu_id
      }).then(() => {
        getDepartamento();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro de Departamento Exitoso!</strong>",
          html: `<i>El departamento <strong>${dep_nombre}</strong> fue registrada con Exito</i>`,
          icon: 'success',
          timer: 5000
        })
      })
      .catch((error) => {
        console.log("Error en la solicitud ADD: ", error);
      });
    };
  
    const update = () => {
      Axios.put("http://localhost:3001/updatedepartamento", {
        dep_id:dep_id,
        dep_nombre:dep_nombre,
        are_id:are_id,
        usu_id:usu_id
      }).then(() => {
        getDepartamento();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualizacion Exitosa!</strong>",
          html: `<i>El departamento <strong>${dep_nombre}</strong> fue actualizada con Exito</i>`,
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
        html: `<i>Quieres eliminar al departamento <strong>${val.are_nombre}</strong>?</i>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarla'
      }).then((result) => {
        if (result.isConfirmed) {
          Axios.delete(`http://localhost:3001/deletedepartamento/${val.dep_id}`).then(() => {
            getDepartamento();
            limpiarCampos();
            Swal.fire(
              'Eliminado!',
              'El departamento ha sido eliminado',
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
      setDep_id("");
      setDep_nombre("");
      setAre_id("");
      setUsu_id("");
      setEditar(false);
    }
  
    const editarEmpleado = (val) => {
      setEditar(true);
  
      setDep_id(val.dep_id);
      setDep_nombre(val.dep_nombre);
      setAre_id(val.are_id);
      setUsu_id(val.usu_id);
    }
  
    const getDepartamento = () => {
      Axios.get("http://localhost:3001/getdepartamento").then((response) => {
        setUsuarioList(response.data);
      })
      .catch((error) => {
        console.log("Error en la solicitud EDIT: ", error);
      });
    }

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
        
        {(userRolRol == 'Administrador' || userRolRol == 'Administrador Operativo') && (
        <div className='card text-center containerGestionDepartamentos'>
          <div className='card-header text-bg-dark'>Gestion de Departamentos</div>
        
          <div className='card-body'>
    
            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>Id del departamento: </span>
              <input type='text' onChange={(e) => {
                setDep_id(e.target.value);
                }} className='form-control' value={dep_id} placeholder='ID del nuevo departamento' aria-describedby='basic-addon1' />
            </div>
    
            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>Nombre del departamento: </span>
              <input type='text' onChange={(e) => {
                setDep_nombre(e.target.value);
                }} className='form-control' value={dep_nombre} placeholder='Nombre del departamento' aria-describedby='basic-addon1' />
            </div>
    
            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>ID del area: </span>
              <input type='number' onChange={(e) => {
                setAre_id(e.target.value);
                }} className='form-control' value={are_id} placeholder='Area al que pertence el departamento' aria-describedby='basic-addon1' />
            </div>

            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>ID del usuario Jefe del departamento: </span>
              <input type='number' onChange={(e) => {
                setUsu_id(e.target.value);
                }} className='form-control' value={usu_id} placeholder='Usuario Jefe del departamento' aria-describedby='basic-addon1' />
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
        )}
        <table className='table table-striped'>
          <thead className='table-primary'>
            <tr>
              <th scope='col'>ID del departamento</th>
              <th scope='col'>Nombre del departamento</th>
              <th scope='col'>ID del area</th>
              <th scope='col'>ID del usuario jefe</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              usuarioList.map((val, key) => {
                return (
                  <tr key={val.id}>
                    <th scope='row'>{val.dep_id}</th> 
                    <td>{val.dep_nombre}</td> 
                    <td>{val.are_id}</td> 
                    <td>{val.usu_id}</td> 
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
      </div>
    );
  }

export default Departamentos;