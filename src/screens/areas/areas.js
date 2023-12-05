import { useState, useEffect } from 'react';
import './areas.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useAuth } from '../auth/AuthContext';

function Areas() {

    const [are_id, setAre_id] = useState(0);
    const [are_nombre, setAre_nombre] = useState("");
    const [usu_id, setUsu_id] = useState(0);
    const [editar, setEditar] = useState(false);
    const [usuarioList, setUsuarioList] = useState([]);
    const { nameUser } = useAuth();
    const [userRolRol, setUserRolRol] = useState('');

    //React para segunda Area
    const [are_idDos, setAre_idDos] = useState(0);
    const [usu_idDos, setUsu_idDos] = useState(0);
    const [editarDos, setEditarDos] = useState(false);
    const [usuarioListDos, setUsuarioListDos] = useState([]);

    useEffect(() => {
        // Obtener la lista de usuarios al montar el componente
        getArea();
        getUserRol();
    }, []);
  
    const add = () => {
      Axios.post("http://localhost:3001/createarea", {
        are_id:are_id,
        are_nombre:are_nombre,
        usu_id:usu_id
      }).then(() => {
        getArea();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro de Area Exitoso!</strong>",
          html: `<i>El area <strong>${are_nombre}</strong> fue registrada con Exito</i>`,
          icon: 'success',
          timer: 5000
        })
      })
      .catch((error) => {
        console.log("Error en la solicitud ADD: ", error);
      });
    };
  
    const update = () => {
      Axios.put("http://localhost:3001/updatearea", {
        are_id:are_id,
        are_nombre:are_nombre,
        usu_id:usu_id
      }).then(() => {
        getArea();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualizacion Exitosa!</strong>",
          html: `<i>El area <strong>${are_nombre}</strong> fue actualizada con Exito</i>`,
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
        html: `<i>Quieres eliminar al area <strong>${val.are_nombre}</strong>?</i>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarla'
      }).then((result) => {
        if (result.isConfirmed) {
          Axios.delete(`http://localhost:3001/deletearea/${val.are_id}`).then(() => {
            getArea();
            limpiarCampos();
            Swal.fire(
              'Eliminado!',
              'El area ha sido eliminada',
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
      setAre_id("");
      setAre_nombre("");
      setUsu_id("");
      setEditar(false);
    }
  
    const editarEmpleado = (val) => {
      setEditar(true);
      setAre_id(val.are_id);
      setAre_nombre(val.are_nombre);
      setUsu_id(val.usu_id);
    }
  
    const getArea = () => {
      Axios.get("http://localhost:3001/getarea").then((response) => {
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

    //AREA DOS

  useEffect(() => {
      // Obtener la lista de usuarios al montar el componente
      getAreaDos();
  }, []);

  const addDos = () => {
    Axios.post("http://localhost:3001/createareados", {
      usu_idDos:usu_idDos,
      are_idDos:are_idDos,
    }).then(() => {
      getAreaDos();
      limpiarCamposDos();
      Swal.fire({
        title: "<strong>Registro de Usuario en Area Exitoso!</strong>",
        html: `<i>El usuario <strong>${usu_idDos}</strong> ha sido registrado con Exito en ${are_idDos}</i>`,
        icon: 'success',
        timer: 5000
      })
    })
    .catch((error) => {
      console.log("Error en la solicitud ADD: ", error);
    });
  };

  const updateDos = () => {
    Axios.put("http://localhost:3001/updateareados", {
      usu_idDos:usu_idDos,
      are_idDos:are_idDos,
    }).then(() => {
      getAreaDos();
      limpiarCamposDos();
      Swal.fire({
        title: "<strong>Actualizacion Exitosa!</strong>",
        html: `<i>El usuario <strong>${usu_idDos}</strong> fue actualizado con Exito</i>`,
        icon: 'success',
        timer: 5000
      })
    })
    .catch((error) => {
      console.log("Error en la solicitud UPDATE: ", error);
    });
  };

  const deleteEmpleDos = (val) => {

    Swal.fire({
      title: "Estas seguro?",
      html: `<i>Quieres eliminar al area <strong>${val.usu_id}</strong>?</i>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarla'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleteareados/${val.usu_id}`).then(() => {
          getAreaDos();
          limpiarCamposDos();
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado',
            'success'
          );
        })
        .catch((error) => {
          console.log("Error en la solicitud DELETE: ", error);
        });
      }
    });
  };

  const limpiarCamposDos = () => {
    setUsu_idDos("");
    setAre_idDos("");
    setEditarDos(false);
  }

  const editarEmpleadoDos = (val) => {
    setEditarDos(true);
    setUsu_idDos(val.usu_id);
    setAre_idDos(val.are_id);
  }

  const getAreaDos = () => {
    Axios.get("http://localhost:3001/getareados").then((response) => {
      setUsuarioListDos(response.data);
    })
    .catch((error) => {
      console.log("Error en la solicitud EDIT: ", error);
    });
  }
  
    return (
      <div className='container'>
        {(userRolRol == 'Administrador' || userRolRol == 'Empleado' || userRolRol == 'Administrador Operativo') && (
        <div className='container-AgregarArea'>


          {(userRolRol == 'Administrador' || userRolRol == 'Administrador Operativo') && (
          <div className='card text-center containerGestionAreas'>
            <div className='card-header text-bg-dark'>Gestion de Areas</div>
          
            <div className='card-body'>
      
              <div className='input-group mb-3'>
                <span className='input-group-text' id='basic-addon1'>Id del area: </span>
                <input type='text' onChange={(e) => {
                  setAre_id(e.target.value);
                  }} className='form-control' value={are_id} placeholder='Cedula empleado' aria-describedby='basic-addon1' />
              </div>
      
              <div className='input-group mb-3'>
                <span className='input-group-text' id='basic-addon1'>Nombre del area: </span>
                <input type='text' onChange={(e) => {
                  setAre_nombre(e.target.value);
                  }} className='form-control' value={are_nombre} placeholder='Nombre que le quieres poner al area' aria-describedby='basic-addon1' />
              </div>
      
              <div className='input-group mb-3'>
                <span className='input-group-text' id='basic-addon1'>Id del gerente del area: </span>
                <input type='number' onChange={(e) => {
                  setUsu_id(e.target.value);
                  }} className='form-control' value={usu_id} placeholder='Direccion empleado' aria-describedby='basic-addon1' />
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
                <th scope='col'>ID del area</th>
                <th scope='col'>Nombre del area</th>
                <th scope='col'>ID del gerente de area</th>
                <th scope='col'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                usuarioList.map((val, key) => {
                  return (
                    <tr key={val.id}>
                      <th scope='row'>{val.are_id}</th> 
                      <td>{val.are_nombre}</td> 
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
        )}

        <div className='container-AgregarEmpleadoArea'>

        {(userRolRol == 'Administrador' || userRolRol == 'Administrador Operativo') && (
          <div className='card text-center containerGestionAreas'>
            <div className='card-header text-bg-dark'>Agregar empleado a un Area</div>
          
            <div className='card-body'>
      
              <div className='input-group mb-3'>
                <span className='input-group-text' id='basic-addon1'>ID del usuario: </span>
                <input type='text' onChange={(e) => {
                  setUsu_idDos(e.target.value);
                  }} className='form-control' value={usu_idDos} placeholder='Cedula empleado' aria-describedby='basic-addon1' />
              </div>
      
              <div className='input-group mb-3'>
                <span className='input-group-text' id='basic-addon1'>ID del area: </span>
                <input type='text' onChange={(e) => {
                  setAre_idDos(e.target.value);
                  }} className='form-control' value={are_idDos} placeholder='Identificador del Area' aria-describedby='basic-addon1' />
              </div>
      
            </div>
            <div className='card-footer text-muted'>
              {
                editarDos ? 
                <div>
                  <button className='btn btn-warning m-2' onClick={updateDos}>Actualizar</button>
                  <button className='btn btn-danger m-2' onClick={limpiarCamposDos}>Cancelar</button>
                </div>
                :
                <button className='btn btn-success' onClick={addDos}>Registrar</button>
              }
          </div>
          </div>
        )}
        

          <table className='table table-striped'>
            <thead className='table-secondary'>
              <tr>
                <th scope='col'>ID del usUArio</th>
                <th scope='col'>ID del area</th>
                <th scope='col'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                usuarioListDos.map((val, key) => {
                  return (
                    <tr key={val.id}>
                      <th scope='row'>{val.usu_id}</th> 
                      <td>{val.are_id}</td> 
                      <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" onClick={() => {
                            editarEmpleadoDos(val);
                          }} className="btn btn-info">Editar</button>
                          <button type="button" onClick={() => {
                            deleteEmpleDos(val)
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
      </div>
    );
  }

export default Areas;