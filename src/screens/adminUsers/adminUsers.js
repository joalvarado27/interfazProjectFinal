import { useState, useEffect } from 'react';
import './adminUsers.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useAuth } from '../auth/AuthContext';

function AdminUsers() {

  const [usu_id, setUsu_id] = useState("");
  const [rel_idDos, setRel_idDos] = useState("");
  const { nameUser } = useAuth();
  const [usu_nombre, setUsu_nombre] = useState("");
  const [usu_contraseña, setUsu_contraseña] = useState("");
  const [rel_tipoDos, setRel_tipoDos] = useState("");
  const [usu_direccion, setUsu_direccion] = useState("");
  const [usu_telefono, setUsu_telefono] = useState("");
  const [usu_salario, setUsu_salario] = useState(0);
  const [rel_id, setRel_id] = useState(0);
  const [editar, setEditar] = useState(false);
  const [editarDos, setEditarDos] = useState(false);
  const [userRolRol, setUserRolRol] = useState("");

  const [usuarioList, setUsuarioList] = useState([]);
  const [usuarioListDos, setUsuarioListDos] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      usu_id:usu_id,
      usu_nombre:usu_nombre,
      usu_contraseña:usu_contraseña,
      usu_direccion:usu_direccion,
      usu_telefono:usu_telefono,
      usu_salario:usu_salario,
      rel_id:rel_id
    }).then(() => {
      getUsuario();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro Exitoso!</strong>",
        html: `<i>El empleado <strong>${usu_nombre}</strong> fue registrado con Exito</i>`,
        icon: 'success',
        timer: 5000
      })
    })
    .catch((error) => {
      console.log("Error en la solicitud POST: ", error);
    });
    console.log("Sirveee")
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      usu_id:usu_id,
      usu_nombre:usu_nombre,
      usu_contraseña:usu_contraseña,
      usu_direccion:usu_direccion,
      usu_telefono:usu_telefono,
      usu_salario:usu_salario,
      rel_id:rel_id
    }).then(() => {
      getUsuario();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualizacion Exitosa!</strong>",
        html: `<i>El empleado <strong>${usu_nombre}</strong> fue actualizado con Exito</i>`,
        icon: 'success',
        timer: 5000
      })
    })
    .catch((error) => {
      console.log("Error en la solicitud POST: ", error);
    });
  };

  const deleteEmple = (val) => {

    Swal.fire({
      title: "Estas seguro?",
      html: `<i>Quieres eliminar al usuario <strong>${val.usu_nombre}</strong>?</i>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.usu_id}`).then(() => {
          getUsuario();
          limpiarCampos();
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado',
            'success'
          );
        })
        .catch((error) => {
          console.log("Error en la solicitud POST: ", error);
        });
      }
    });
  };

  const limpiarCampos = () => {
    setUsu_nombre("");
    setUsu_contraseña("");
    setUsu_direccion("");
    setUsu_id("");
    setUsu_salario("");
    setUsu_telefono("");
    setRel_id("");
    setEditar(false);
  }

  const editarEmpleado = (val) => {
    setEditar(true);

    setUsu_id(val.usu_id);
    setUsu_contraseña(val.usu_contraseña);
    setUsu_nombre(val.usu_nombre);
    setUsu_direccion(val.usu_direccion);
    setUsu_salario(val.usu_salario);
    setUsu_telefono(val.usu_telefono);
    setRel_id(val.rel_id);
  }

  const getUsuario = () => {
    Axios.get("http://localhost:3001/usuario").then((response) => {
      setUsuarioList(response.data);
    })
    .catch((error) => {
      console.log("Error en la solicitud POST: ", error);
    });
  }

  //SEGUNDA PARTE
  const addDos = () => {
    Axios.post("http://localhost:3001/createrelacion", {
      rel_idDos:rel_idDos,
      rel_tipoDos:rel_tipoDos,
    }).then(() => {
      getUsuarioDos();
      limpiarCamposDos();
      Swal.fire({
        title: "<strong>Registro Exitoso!</strong>",
        html: `<i>La relacion <strong>${rel_tipoDos}</strong> fue registrado con Exito</i>`,
        icon: 'success',
        timer: 5000
      })
    })
    .catch((error) => {
      console.log("Error en la solicitud POST: ", error);
    });
  };

  const updateDos = () => {
    Axios.put("http://localhost:3001/updaterelacion", {
      rel_idDos:rel_idDos,
      rel_tipoDos:rel_tipoDos,
    }).then(() => {
      getUsuarioDos();
      limpiarCamposDos();
      Swal.fire({
        title: "<strong>Actualizacion Exitosa!</strong>",
        html: `<i>La relacion <strong>${rel_tipoDos}</strong> fue actualizado con Exito</i>`,
        icon: 'success',
        timer: 5000
      })
    })
    .catch((error) => {
      console.log("Error en la solicitud POST: ", error);
    });
  };

  const deleteEmpleDos = (val) => {

    Swal.fire({
      title: "Estas seguro?",
      html: `<i>Quieres eliminar al usuario <strong>${val.rel_tipo}</strong>?</i>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleterelacion/${val.rel_id}`).then(() => {
          getUsuarioDos();
          limpiarCamposDos();
          Swal.fire(
            'Eliminado!',
            'La relacion ha sido eliminado',
            'success'
          );
        })
        .catch((error) => {
          console.log("Error en la solicitud POST: ", error);
        });
      }
    });
  };

  const limpiarCamposDos = () => {
    setRel_idDos("");
    setRel_tipoDos("");
    setEditarDos(false);
  }

  const editarEmpleadoDos = (val) => {
    setEditarDos(true);
    setRel_idDos(val.rel_id);
    setRel_tipoDos(val.rel_tipo);
  }

  const getUsuarioDos = () => {
    Axios.get("http://localhost:3001/getrelacion").then((response) => {
      setUsuarioListDos(response.data);
    })
    .catch((error) => {
      console.log("Error en la solicitud POST: ", error);
    });
  }

  useEffect(() => {
    // Obtener la lista de usuarios al montar el componente
    getUserRol();
    getUsuarioDos();
    getUsuario();
    }, []);

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
      <div className='containerRelacion'>
        {(userRolRol == 'Administrador') && (
        <div className='card text-center containerGestionUsuarios'>
          <div className='card-header text-bg-dark'>Agrega una Relacion</div>
        
          <div className='card-body'>

            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>ID de la relacion: </span>
              <input type='text' onChange={(e) => {
                setRel_idDos(e.target.value);
                }} className='form-control' value={rel_idDos} placeholder='Id' aria-describedby='basic-addon1' />
            </div>

            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>Tipo de relacion: </span>
              <input type='text' onChange={(e) => {
                setRel_tipoDos(e.target.value);
                }} className='form-control' value={rel_tipoDos} placeholder='Nombre relacion' aria-describedby='basic-addon1' />
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
              (userRolRol == 'Administrador' || userRolRol == 'Administrador Operativo') && <button className='btn btn-success' onClick={addDos}>Registrar</button>
            }
          </div>
        </div>
        )}
        <table className='table table-striped'>
          <thead className='table-primary'>
            <tr>
              <th scope='col'>Relacion</th>
              <th scope='col'>Tipo de relacion</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              usuarioListDos.map((val, key) => {
                return (
                  <tr key={val.id}>
                    <th scope='row'>{val.rel_id}</th> 
                    <td>{val.rel_tipo}</td> 
                    {(userRolRol == 'Administrador') && (
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
      <div className='containerAdminUsers'>
        <div className='card text-center containerGestionUsuarios'>
          <div className='card-header text-bg-dark'>Agrega un Usuario</div>
        
          <div className='card-body'>

            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>Cedula: </span>
              <input type='text' onChange={(e) => {
                setUsu_id(e.target.value);
                }} className='form-control' value={usu_id} placeholder='Cedula empleado' aria-describedby='basic-addon1' />
            </div>

            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>Contraseña: </span>
              <input type='text' onChange={(e) => {
                setUsu_contraseña(e.target.value);
                }} className='form-control' value={usu_contraseña} placeholder='Contraseña empleado' aria-describedby='basic-addon1' />
            </div>

            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>Nombre: </span>
              <input type='text' onChange={(e) => {
                setUsu_nombre(e.target.value);
                }} className='form-control' value={usu_nombre} placeholder='Nombre empleado' aria-describedby='basic-addon1' />
            </div>

            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>Direccion: </span>
              <input type='text' onChange={(e) => {
                setUsu_direccion(e.target.value);
                }} className='form-control' value={usu_direccion} placeholder='Direccion empleado' aria-describedby='basic-addon1' />
            </div>

            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>Telefono: </span>
              <input type='text' onChange={(e) => {
                setUsu_telefono(e.target.value);
                }} className='form-control' value={usu_telefono} placeholder='Telefono empleado' aria-describedby='basic-addon1' />
            </div>

            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>Salario: </span>
              <input type='text' onChange={(e) => {
                setUsu_salario(e.target.value);
                }} className='form-control' value={usu_salario} placeholder='Salario empleado' aria-describedby='basic-addon1' />
            </div>

            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>Relacion: </span>
              <input type='text' onChange={(e) => {
                setRel_id(e.target.value);
                }} className='form-control' value={rel_id} placeholder='Relacion con la empresa' aria-describedby='basic-addon1' />
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
              (userRolRol == 'Administrador' || userRolRol == 'Administrador Operativo') && <button className='btn btn-success' onClick={add}>Registrar</button>
            }
          </div>
        </div>
        <table className='table table-striped'>
          <thead className='table-primary'>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Contraseña</th>
              <th scope='col'>Nombre</th>
              <th scope='col'>Direccion</th>
              <th scope='col'>Telefono</th>
              <th scope='col'>Salario</th>
              <th scope='col'>Relacion ID</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              usuarioList.map((val, key) => {
                return (
                  <tr key={val.id}>
                    <th scope='row'>{val.usu_id}</th> 
                    <td>{val.usu_contraseña}</td> 
                    <td>{val.usu_nombre}</td> 
                    <td>{val.usu_direccion}</td> 
                    <td>{val.usu_telefono}</td> 
                    <td>{val.usu_salario}</td> 
                    <td>{val.rel_id}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" onClick={() => {
                          editarEmpleado(val);
                        }} className="btn btn-info">Editar</button>
                        {(userRolRol == 'Administrador' || userRolRol == 'Administrador Operativo') && <button type="button" onClick={() => {
                          deleteEmple(val)
                        }} className="btn btn-danger">Eliminar</button>}
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

export default AdminUsers;