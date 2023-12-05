import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import { FaLock } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import './login.css';
import Swal from 'sweetalert2';

const Login = () => {
    const { login } = useAuth();
    const [listUser, setListUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener la lista de usuarios al montar el componente
        getUsuario();
    }, []);

    const getUsuario = () => {
        Axios.get("http://localhost:3001/usuariodos").then((response) => {
          setListUsers(response.data);
        })
        .catch((error) => {
          console.log("Error en la solicitud GET: ", error);
        });
    }

    const handleLogin = (e) => {
        e.preventDefault();

        try {
            // Verificar si algún usuario coincide con el nombre proporcionado
            const isUserAuthenticated = listUser.some((user) => user.usu_id == username && user.usu_contraseña == password);

            if (isUserAuthenticated) {
                login(username);
                Swal.fire({
                    title: "<strong>Correcto!</strong>",
                    html: `<i>Has iniciado sesion correctamente</i>`,
                    icon: 'success',
                    timer: 2000
                });
                setTimeout(() => {navigate('/home')}, 3000)
            } else {
                alert('Nombre incorrecto')
            }
        } catch(error) {
            console.log(error);
        }
    }
    
    return (
       <div className='bodyLogin'>
        <section>
                <form onSubmit={handleLogin}>
                    <h1>Inicio de Sesion</h1>
                    <div className='inputbox'>
                        <FaUserCircle className='icon-email'/>
                        <input type='text' required autoFocus value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label for="">Id Usuario</label>
                    </div>
                    <div className='inputbox'>
                        <FaLock className='icon-password'/>
                        <input type='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label for="">Contrasena</label>
                    </div>
                    <div className='forget'></div>
                    <button type='submit'>Iniciar Sesion</button>
                </form>
        </section>
       </div>
    );
}

export default Login;

