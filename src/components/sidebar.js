import { useRef, useState, useEffect } from "react";
import Axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { SiGooglemybusiness } from "react-icons/si";
import { IoMenu } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { GiTowerBridge } from "react-icons/gi";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { MdOutlinePostAdd } from "react-icons/md";
import { SlEnergy } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../screens/auth/AuthContext";
import { GrMoney } from "react-icons/gr";

export default function Siderbar() {
	const { nameUser, logout } = useAuth();
	const [ userRol, setUserRol ] = useState('');
	const [ userRolRol, setUserRolRol ] = useState('');
	const [ color, setColor ] = useState('#11101d');
	const [ colorFoot, setColorFoot ] = useState('#1d1b31');

	useEffect(() => {
        // Obtener la lista de usuarios al montar el componente
        getUserRol();
		getColor();
    }, []);

	const getColor = () => {
		if(userRolRol == 'Administrador'){
			setColor('#11101d')
		}
		if(userRolRol == 'Administrador Contable' || userRolRol == "Accionista"){
			setColor('#700729');
		}
		if(userRolRol == "Administrador Operativo"){
			setColor('#760000')
		}

	};

	const getUserRol = () => {
		Axios.get(`http://localhost:3001/getroluser/${nameUser}`).then((response) => {
		  setUserRol(response.data[0].usu_nombre);
		  setUserRolRol(response.data[0].nombre_rol)
		})
		.catch((error) => {
		  console.log("Error en la solicitud EDIT: ", error);
		});
	};

	/*const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};*/

	return (
		<div className="body-sidebar">
			<div className="sidebar" style= {{background:color}} >
				<div className="logo_content">
					<h1>TERMOPAIPA</h1>
				</div>
				<ul className="nav_list">
					<li>
						<Link to='/home'>
							<FaHome className="i" />
							<span className="links_name">Home</span>
						</Link>
					</li>
					<li>
						<Link to='/agregarusuario'>
							<FaUserPlus className="i" />
							<span className="links_name">Agregar Usuario</span>
						</Link>
					</li>
					{(userRolRol == 'Administrador' || userRolRol == 'Administrador Operativo')&& (
					<li>
						<Link to='/privilegios'>
							<GiTowerBridge className="i" />
							<span className="links_name">Privilegios</span>
						</Link>
					</li>
					)}
					{(userRolRol == 'Empleado' ||  userRolRol == 'Administrador' || userRolRol == 'Administrador Operativo' || userRolRol == 'Administrador Contable')&& (
					<li>
						<Link to='/areas'>
							<GiTowerBridge className="i" />
							<span className="links_name">Areas</span>
						</Link>
						
					</li>
					)}
					{(userRolRol == 'Empleado' ||  userRolRol == 'Administrador' || userRolRol == 'Administrador Operativo')&& (
					<li>
						<Link to='/departamentos'>
							<BiSolidBuildingHouse className="i" />
							<span className="links_name">Departamentos</span>
						</Link>
					</li>
					)}
					{(userRolRol == 'Proveedor' ||  userRolRol == 'Administrador' || userRolRol == 'Administrador Operativo' || userRolRol == 'Administrador Contable')&& (
					<li>
						<Link to='/solicitarproducto'>
							<MdOutlinePostAdd className="i" />
							<span className="links_name">Solicitar Producto</span>
						</Link>
					</li>
					)}
					{(userRolRol == 'Administrador' || userRolRol == 'Administrador Contable')&& (
					<li>
						<Link to='/gastos'>
							<GrMoney className="i" />
							<span className="links_name">Gastos</span>
						</Link>
					</li>
					)}
					{(userRolRol == 'Administrador' || userRolRol == 'Empleado' || userRolRol == 'Accionista' || userRolRol == 'Administrador Operativo' || userRolRol == 'Administrador Contable')&& (
					<li>
						<Link to='/energia'>
							<SlEnergy className="i" />
							<span className="links_name">Energia</span>
						</Link>
					</li>
					)}
				</ul>
				<div className="profile_content">
					<div className="profile" style= {{background:colorFoot}}>
						<div className="profile_details">
							<FaRegUserCircle className="img-user" />
							<div className="name_job">
								<div className="name">{userRol}</div>
								<div className="job">{userRolRol}</div>
							</div>
						</div>
						<Link to='/'>
						    <CiLogout onClick={logout} className='icon-logout' />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};