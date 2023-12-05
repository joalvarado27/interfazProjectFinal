import { useState, useEffect } from 'react';
import './solicitarproducto.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useAuth } from '../auth/AuthContext';

function SolicitarProducto() {

    const [dep_id, setDep_id] = useState(0);
    const { nameUser } = useAuth();
    const [pro_id, setPro_id] = useState("");
    const [sol_fecha, setSol_fecha] = useState(0);
    const [sol_cantidad, setSol_cantidad] = useState(0);
    const [sol_confirmacion, setSol_confirmacion] = useState(false);
    const [editar, setEditar] = useState(false);
    const [editarDos, setEditarDos] = useState(false);
    const [pro_idDos, setPro_idDos] = useState("");
    const [pro_nombreDos, setPro_nombreDos] = useState("");
    const [pro_precioDos, setPro_precioDos] = useState("");
    const [usuarioList, setUsuarioList] = useState([]);
    const [usuarioListDos, setUsuarioListDos] = useState([]);
    const [userRolRol, setUserRolRol] = useState("");

    useEffect(() => {
        // Obtener la lista de usuarios al montar el componente
        getSolicitar();
        getSolicitarDos();
        getUserRol();
    }, []);
  
    const add = () => {
      Axios.post("http://localhost:3001/createsolicitar", {
        dep_id:dep_id,
        pro_id:pro_id,
        sol_fecha:sol_fecha,
        sol_cantidad:sol_cantidad,
        sol_confirmacion:sol_confirmacion
      }).then(() => {
        getSolicitar();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro de Solicitud Exitosa!</strong>",
          html: `<i>La solicitud fue registrada con Exito</i>`,
          icon: 'success',
          timer: 5000
        })
      })
      .catch((error) => {
        console.log("Error en la solicitud ADD: ", error);
      });
    };

    const addDos = () => {
        Axios.post("http://localhost:3001/createproducto", {
          pro_id:pro_idDos,
          pro_nombre:pro_nombreDos,
          pro_precio:pro_precioDos
        }).then(() => {
          getSolicitarDos();
          limpiarCamposDos();
          Swal.fire({
            title: "<strong>Registro de Producto Exitoso!</strong>",
            html: `<i>El producto fue registrado con Exito</i>`,
            icon: 'success',
            timer: 5000
          })
        })
        .catch((error) => {
          console.log("Error en la solicitud ADD: ", error);
        });
      };
  
    const update = () => {
      Axios.put("http://localhost:3001/updatesolicitar", {
        dep_id:dep_id,
        pro_id:pro_id,
        sol_fecha:sol_fecha,
        sol_cantidad:sol_cantidad,
        sol_confirmacion:sol_confirmacion
      }).then(() => {
        getSolicitar();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualizacion Exitosa!</strong>",
          html: `<i>La solicitud fue actualizada con Exito</i>`,
          icon: 'success',
          timer: 5000
        })
      })
      .catch((error) => {
        console.log("Error en la solicitud UPDATE: ", error);
      });
    };

    const updateDos = () => {
        Axios.put("http://localhost:3001/updateproducto", {
          pro_idDos:pro_idDos,
          pro_nombreDos:pro_nombreDos,
          pro_precioDos:pro_precioDos
        }).then(() => {
          getSolicitarDos();
          limpiarCamposDos();
          Swal.fire({
            title: "<strong>Actualizacion Exitosa!</strong>",
            html: `<i>El producto fue actualizado con Exito</i>`,
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
        html: `<i>Quieres eliminar la solicitud?</i>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarla'
    }).then((result) => {
        if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/deletesolicitar/${val.dep_id}`).then(() => {
            getSolicitar();
            limpiarCampos();
            Swal.fire(
            'Eliminado!',
            'La solicitud ha sido eliminada',
            'success'
            );
        })
        .catch((error) => {
            console.log("Error en la solicitud DELETE: ", error);
        });
        }
    });
    };
  
    const deleteEmpleDos = (val) => {
  
      Swal.fire({
        title: "Estas seguro?",
        html: `<i>Quieres eliminar el producto?</i>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarla'
      }).then((result) => {
        if (result.isConfirmed) {
          Axios.delete(`http://localhost:3001/deleteproducto/${val.pro_id}`).then(() => {
            getSolicitarDos();
            limpiarCamposDos();
            Swal.fire(
              'Eliminado!',
              'El producto ha sido eliminado',
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
        setDep_id("")
        setPro_id("")
        setSol_fecha("");
        setSol_cantidad("");
        setSol_confirmacion("")
        setEditar(false);
    }
  
    const limpiarCamposDos = () => {
      setPro_idDos("");
      setPro_nombreDos("")
      setPro_precioDos("")
      setEditarDos(false);
    }
  
    const editarEmpleado = (val) => {
      setEditar(true);
      setDep_id(val.dep_id);
      setPro_id(val.pro_id);
      setSol_fecha(val.sol_fecha);
      setSol_cantidad(val.sol_cantidad);
      setSol_confirmacion(val.sol_confirmacion);
    }

    const editarEmpleadoDos = (val) => {
        setEditarDos(true);
        setPro_idDos(val.pro_id);
        setPro_nombreDos(val.pro_nombre);
        setPro_precioDos(val.pro_precio);
    }
  
    const getSolicitar = () => {
      Axios.get("http://localhost:3001/getsolicitar").then((response) => {
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

    const getSolicitarDos = () => {
        Axios.get("http://localhost:3001/getproducto").then((response) => {
          setUsuarioListDos(response.data);
        })
        .catch((error) => {
          console.log("Error en la solicitud EDIT: ", error);
        });
      }
  
    return (
      <div className='container'>
        {(userRolRol == 'Proveedor' ||  userRolRol == 'Administrador' || userRolRol == 'Administrador Contable')&& (
        <div className='containerProducto'>
        
        {(userRolRol == 'Administrador' || userRolRol == 'Administrador Contable') && (<div className='card text-center containerGestionDepartamentos'>
              <div className='card-header text-bg-dark'>Gestion de Productos</div>
              
              <div className='card-body'>
          
                  <div className='input-group mb-3'>
                  <span className='input-group-text' id='basic-addon1'>Id del producto: </span>
                  <input type='text' onChange={(e) => {
                      setPro_idDos(e.target.value);
                      }} className='form-control' value={pro_idDos} placeholder='ID del producto' aria-describedby='basic-addon1' />
                  </div>
          
                  <div className='input-group mb-3'>
                  <span className='input-group-text' id='basic-addon1'>Nombre del producto: </span>
                  <input type='text' onChange={(e) => {
                      setPro_nombreDos(e.target.value);
                      }} className='form-control' value={pro_nombreDos} placeholder='Producto' aria-describedby='basic-addon1' />
                  </div>
          
                  <div className='input-group mb-3'>
                  <span className='input-group-text' id='basic-addon1'>Precio producto: </span>
                  <input type='number' onChange={(e) => {
                      setPro_precioDos(e.target.value);
                      }} className='form-control' value={pro_precioDos} placeholder='Precio' aria-describedby='basic-addon1' />
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
            <thead className='table-primary'>
                <tr>
                <th scope='col'>ID del producto</th>
                <th scope='col'>Nombre del producto</th>
                <th scope='col'>Precio del producto</th>
                <th scope='col'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                usuarioListDos.map((val, key) => {
                    return (
                    <tr key={val.id}>
                        <th scope='row'>{val.pro_id}</th> 
                        <td>{val.pro_nombre}</td> 
                        <td>{val.pro_precio}</td> 
                        {(userRolRol == 'Administrador' || userRolRol == 'Administrador Contable')&& (
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
                        )}
                    </tr>
                    )
                })
                }
            </tbody>
            </table>
        </div>
        )}

        {(userRolRol == 'Proveedor' ||  userRolRol == 'Administrador' || userRolRol == 'Administrador Contable' || userRolRol == 'Administrador Operativo')&& (
        <div className='containerSolicitud'>
        
            {(userRolRol == 'Administrador' || userRolRol == 'Administrador Operativo' || userRolRol == 'Proveedor')&& (
            <div className='card text-center containerGestionDepartamentos'>
            <div className='card-header text-bg-dark'>Gestion de Solicitudes</div>
            
            <div className='card-body'>
        
                <div className='input-group mb-3'>
                <span className='input-group-text' id='basic-addon1'>Id del departamento: </span>
                <input type='text' onChange={(e) => {
                    setDep_id(e.target.value);
                    }} className='form-control' value={dep_id} placeholder='ID del nuevo departamento' aria-describedby='basic-addon1' />
                </div>
        
                <div className='input-group mb-3'>
                <span className='input-group-text' id='basic-addon1'>ID del producto: </span>
                <input type='text' onChange={(e) => {
                    setPro_id(e.target.value);
                    }} className='form-control' value={pro_id} placeholder='Identificador del producto' aria-describedby='basic-addon1' />
                </div>
        
                <div className='input-group mb-3'>
                <span className='input-group-text' id='basic-addon1'>Fecha de la solicitud: </span>
                <input type='number' onChange={(e) => {
                    setSol_fecha(e.target.value);
                    }} className='form-control' value={sol_fecha} placeholder='Fecha' aria-describedby='basic-addon1' />
                </div>

                <div className='input-group mb-3'>
                <span className='input-group-text' id='basic-addon1'>Cantidad del producto en Kg: </span>
                <input type='number' onChange={(e) => {
                    setSol_cantidad(e.target.value);
                    }} className='form-control' value={sol_cantidad} placeholder='Cantidad a pedir' aria-describedby='basic-addon1' />
                </div>

                <div className='input-group mb-3'>
                <span className='input-group-text' id='basic-addon1'>Estado: </span>
                <input type='number' onChange={(e) => {
                    setSol_confirmacion(e.target.value);
                    }} className='form-control' value={sol_confirmacion} placeholder='Confirmar' aria-describedby='basic-addon1' />
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
                (userRolRol == 'Administrador' || userRolRol == 'Administrador Operativo')&&<button className='btn btn-success' onClick={add}>Registrar</button>
                }
            </div>
            </div>
            )}
            <table className='table table-striped'>
            <thead className='table-primary'>
                <tr>
                <th scope='col'>ID del departamento</th>
                <th scope='col'>ID del producto</th>
                <th scope='col'>Fecha de la solicitud</th>
                <th scope='col'>Cantidad solicitad</th>
                <th scope='col'>Estado</th>
                <th scope='col'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                usuarioList.map((val, key) => {
                    console.log(val.sol_confirmacion.data[0]);
                    return (
                    <tr key={val.id}>
                        <th scope='row'>{val.dep_id}</th> 
                        <td>{val.pro_id}</td> 
                        <td>{val.sol_fecha}</td> 
                        <td>{val.sol_cantidad}</td> 
                        <td>{val.sol_confirmacion.data[0]}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            {(userRolRol == 'Administrador' || userRolRol == 'Administrador Operativo' || userRolRol == 'Proveedor')&& (
                            <button type="button" onClick={() => {
                            editarEmpleado(val);
                            }} className="btn btn-info">Editar</button>
                            )}
                            {(userRolRol == 'Administrador' || userRolRol == 'Administrador Operativo')&& (
                            <button type="button" onClick={() => {
                            deleteEmple(val)
                            }} className="btn btn-danger">Eliminar</button>
                            )}
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
      </div>
    );
  }

export default SolicitarProducto;