import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import './index.scss';

const modelo = {
    primerNombre: "",
    segundoNombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    telefono: "",
    correo: "",
    contraseña: "",
    idRol: 0
}

const Sidebar = () => {

    const { user } = useContext(UserContext);

    const [dataUser, setDataUser] = useState(modelo)

    useEffect(() => {
        let dt = JSON.parse(user)
        setDataUser(dt)

    }, [])
    return (

        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/home">
                <div className="sidebar-brand-icon">
                    <i className="fas fa-desktop"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Software Team</div>
            </Link>


            <hr className="sidebar-divider my-0 " />


            <li className="nav-item">
                <NavLink to="/home" className="nav-link" >
                    <i className="fas fa-fw fa-house-user"></i>
                    <span>Inicio</span>
                </NavLink>
            </li>

            <hr className="sidebar-divider" />
            {
                (dataUser.idRol == 1) &&
                <li className="nav-item">
                    <NavLink to="/usuario" className="nav-link" >
                        <i className="fas fa-fw fa-users"></i>
                        <span>Usuarios</span>
                    </NavLink>
                </li>
            }

            {
                (dataUser.idRol == 1) &&
                <li className="nav-item">
                    <NavLink to="/proveedor" className="nav-link" >
                        <i className="fas fa-fw fa-briefcase"></i>
                        <span>Proveedores</span>
                    </NavLink>
                </li>
            }

            {
                (dataUser.idRol == 1) &&
                <li className="nav-item">
                    <NavLink to="/cliente" className="nav-link" >
                        <i className="fas fa-fw fa-user-alt"></i>
                        <span>Clientes</span>
                    </NavLink>
                </li>
            }

            <li className="nav-item">
                <NavLink to="/producto" className="nav-link" >
                    <i className="fas fa-fw fa-user-check"></i>
                    <span>Productos</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/entrada" className="nav-link" >
                    <i className="fas fa-box"></i>
                    <span>Entradas</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/salida" className="nav-link" >
                <i className="fas fa-wallet"></i>
                    <span>Salidas</span>
                </NavLink>
            </li>

            {(dataUser.idRol == 1) &&
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseReporte"
                        aria-expanded="true" aria-controls="collapseReporte">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Inventario</span>
                    </a>
                    <div id="collapseReporte" className="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <NavLink to="/inventario" className="collapse-item">Ver lista</NavLink>
                        </div>
                        <div className="bg-white py-1 collapse-inner rounded">
                            <NavLink to="/informeInventario" className="collapse-item">Informe</NavLink>
                        </div>
                    </div>
                </li>
            }



            <hr className="sidebar-divider d-none d-md-block" />

            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

        </ul>
    )
}

export default Sidebar;