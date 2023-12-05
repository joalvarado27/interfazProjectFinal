import { useState, useEffect } from 'react';
import './privilegios.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useAuth } from '../auth/AuthContext';

function Privilegios() {

    const [id_usuario, setId_usuario] = useState(0);
    const [id_rol, setId_rol] = useState("");
    const [usu_contrasena, setUsu_contrasena] = useState(0);
    const [editar, setEditar] = useState(false);
    const [userRolRol, setUserRolRol] = useState("");
    const [mandar , setMandar] = useState("");
    const { nameUser } = useAuth();
  
    const [usuarioList, setUsuarioList] = useState([]);

    useEffect(() => {
        // Obtener la lista de usuarios al montar el componente
        getPrivilegios();
        getUserRol();
    }, []);
  
    const add = () => {
      Axios.post("http://localhost:3001/createprivilegios", {
        id_usuario:id_usuario,
        id_rol:id_rol,
        usu_contrasena:usu_contrasena
      }).then(() => {
        getPrivilegios();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro de Departamento Exitoso!</strong>",
          html: `<i>Se le ha otorgado privilegios al usuario <strong>${id_usuario}</strong></i>`,
          icon: 'success',
          timer: 5000
        })
      })
      .catch((error) => {
        console.log("Error en la solicitud ADD: ", error);
      });

      let opo = 0;

      if(id_rol == 1){
        opo = 'Administrador';
      };

      if(id_rol == 2){
        opo = 'Empleado';
      };

      if(id_rol == 3){
        opo = 'Proveedor';
      };

      if(id_rol == 4){
        opo = 'Accionista';
      };

      if(id_rol == 5){
        opo = 'Administrador Operativo';
      };

      if(id_rol == 6){
        opo = 'Administrador Contable';
      };

      Axios.put("http://localhost:3001/updatenuevousuario", {
        id_usuario:id_usuario,
        usu_contrasena:usu_contrasena
      }).then(() => {
        console.log(mandar)
      })
      .catch((error) => {
        console.log("Error en la solicitud ADD: ", error);
      });

      Axios.put("http://localhost:3001/updatenuevousuariogrant", {
        id_rol: opo,
        id_usuario:id_usuario
      }).then(() => {
        console.log(mandar)
      })
      .catch((error) => {
        console.log("Error en la solicitud ADD: ", error);
      });

      Axios.put("http://localhost:3001/updatenuevousuariodos", {
        id_usuario:id_usuario
      }).then(() => {
        console.log(mandar)
      })
      .catch((error) => {
        console.log("Error en la solicitud ADD: ", error);
      });
    };
  
    const update = () => {
      Axios.put("http://localhost:3001/updateprivilegios", {
        id_usuario:id_usuario,
        id_rol:id_rol,
        usu_contrasena:usu_contrasena
      }).then(() => {
        getPrivilegios();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualizacion Exitosa!</strong>",
          html: `<i>El usuario <strong>${id_usuario}</strong> fue actualizado con Exito</i>`,
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
        html: `<i>Quieres eliminar al departamento <strong>${val.id_usuario}</strong>?</i>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarla'
      }).then((result) => {
        if (result.isConfirmed) {
          Axios.delete(`http://localhost:3001/deleteprivilegios/${val.id_usuario}`).then(() => {
            getPrivilegios();
            limpiarCampos();
            Swal.fire(
              'Eliminado!',
              'El usuario ya no tiene privilegios',
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
      setId_usuario("");
      setId_rol("");
      setUsu_contrasena("");
      setEditar(false);
    }
  
    const editarEmpleado = (val) => {
      setEditar(true);
      setId_usuario(val.id_usuario);
      setId_rol(val.id_rol);
      setUsu_contrasena(val.usu_contrasena);
    }
  
    const getPrivilegios = () => {
      Axios.get("http://localhost:3001/getprivilegios").then((response) => {
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
          <div className='card-header text-bg-dark'>Gestion de Roles</div>
        
          <div className='card-body'>
    
            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>Id del usuario: </span>
              <input type='text' onChange={(e) => {
                setId_usuario(e.target.value);
                }} className='form-control' value={id_usuario} placeholder='ID del usuario' aria-describedby='basic-addon1' />
            </div>
    
            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>Id del rol: </span>
              <input type='text' onChange={(e) => {
                setId_rol(e.target.value);
                }} className='form-control' value={id_rol} placeholder='Id rol' aria-describedby='basic-addon1' />
            </div>
    
            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>Contrasena del usuario: </span>
              <input type='text' onChange={(e) => {
                setUsu_contrasena(e.target.value);
                }} className='form-control' value={usu_contrasena} placeholder='Contrasena' aria-describedby='basic-addon1' />
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
              <th scope='col'>Nombre de usuario</th>
              <th scope='col'>Rol del usuario</th>
              <th scope='col'>Contrasena</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              usuarioList.map((val, key) => {
                return (
                  <tr key={val.id}>
                    <th scope='row'>{val.id_usuario}</th> 
                    <td>{val.id_rol}</td> 
                    <td>{val.usu_contrasena}</td> 
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

export default Privilegios;