import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PDFViewer } from '@react-pdf/renderer';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/scss/bootstrap.scss';

//pages
import Home from './pages/home/Home';
import UsuarioList from './pages/usuario/UsuarioList';
import UsuarioForm from './pages/usuario/UsuarioForm';
import UsuarioEdit from './pages/usuario/UsuarioEdit';
import Login from './pages/login/Login';
import VerificarUsuario from './components/VerificarUsuario';

import ProveedorList from './pages/proveedor/ProveedorList';
import ProveedorForm from './pages/proveedor/ProveedorForm';
import ProveedorEdit from './pages/proveedor/ProveedorEdit';

import ClienteList from './pages/cliente/ClienteList';
import ClienteForm from './pages/cliente/ClienteForm';
import ClienteEdit from './pages/cliente/ClienteEdit';

import ProductoList from './pages/producto/ProductoList';
import ProductoForm from './pages/producto/ProductoForm';
import ProductoEdit from './pages/producto/ProductoEdit';

import EntradaList from './pages/entrada/EntradaList';
import EntradaForm from './pages/entrada/EntradaForm';
import EntradaEdit from './pages/entrada/EntradaEdit';

import SalidaList from './pages/salida/SalidaList';
import SalidaForm from './pages/salida/SalidaForm';
import SalidaEdit from './pages/salida/SalidaEdit';

import InventarioList from './pages/inventario/InventarioList';

import UserProvider from './context/UserProvider';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('wrapper'));

root.render(
    <BrowserRouter>
        <UserProvider>
            <Routes>

                {/*ACONTINUACION ESTABLECEMOS LAS RUTAS DE NUESTRO SISTEMA*/}

                {/*ruta individual sin usar una como base*/}
                <Route index path='/Login' element={<Login />} />

                {/*Permite anidar rutas en base a una*/}
                <Route path='/' element={<App />}>

                    <Route index element={<Home />} />
                    <Route path='home' element={<VerificarUsuario> <Home /> </VerificarUsuario>} />
                    <Route path='usuario' element={<VerificarUsuario> <UsuarioList /> </VerificarUsuario>} />
                    <Route path='usuario/create' element={<VerificarUsuario> <UsuarioForm /> </VerificarUsuario>} />
                    <Route path='usuario/edit/:id' element={<VerificarUsuario> <UsuarioEdit /> </VerificarUsuario>} />

                    <Route path='proveedor' element={<VerificarUsuario> <ProveedorList /> </VerificarUsuario>} />
                    <Route path='proveedor/create' element={<VerificarUsuario> <ProveedorForm /> </VerificarUsuario>} />
                    <Route path='proveedor/edit/:id' element={<VerificarUsuario> <ProveedorEdit /> </VerificarUsuario>} />

                    <Route path='cliente' element={<VerificarUsuario> <ClienteList /> </VerificarUsuario>} />
                    <Route path='cliente/create' element={<VerificarUsuario> <ClienteForm /> </VerificarUsuario>} />
                    <Route path='cliente/edit/:id' element={<VerificarUsuario> <ClienteEdit /> </VerificarUsuario>} />

                    <Route path='producto' element={<VerificarUsuario> <ProductoList /> </VerificarUsuario>} />
                    <Route path='producto/create' element={<VerificarUsuario> <ProductoForm /> </VerificarUsuario>} />
                    <Route path='producto/edit/:id' element={<VerificarUsuario> <ProductoEdit /> </VerificarUsuario>} />

                    <Route path='entrada' element={<VerificarUsuario> <EntradaList /> </VerificarUsuario>} />
                    <Route path='entrada/create' element={<VerificarUsuario> <EntradaForm /> </VerificarUsuario>} />
                    <Route path='entrada/edit/:id' element={<VerificarUsuario> <EntradaEdit /> </VerificarUsuario>} />

                    <Route path='salida' element={<VerificarUsuario> <SalidaList /> </VerificarUsuario>} />
                    <Route path='salida/create' element={<VerificarUsuario> <SalidaForm /> </VerificarUsuario>} />
                    <Route path='salida/edit/:id' element={<VerificarUsuario> <SalidaEdit /> </VerificarUsuario>} />

                    <Route path='inventario' element={<VerificarUsuario> <InventarioList /> </VerificarUsuario>} />
                    
                </Route>

            </Routes>

        </UserProvider>


    </BrowserRouter>
);

