import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'

//Sweet Alert
import Swal from 'sweetalert2'

//ReactStrap
import { Card, CardBody, CardHeader, Button } from "reactstrap";

//Services
import UsuarioService from '../../services/usuario';

const API_URL = 'http://localhost:5000/api/usuarios/'

function UsuarioList() {

    const navigate = useNavigate();

    const [usuarios, setUsuario] = useState([])
    useEffect(() => {
        getUsuarios()
    }, [])

    //procedimineto para mostrar todos los usuarios
    const getUsuarios = async () => {
        const res = await axios.get(API_URL)
        setUsuario(res.data)
        console.log(res.data);
    }

    //Columnas tabla
    const columns = [
        {
            name: 'Nombre 1',
            selector: row => row.primerNombre,
            sortable: true,
        },
        {
            name: 'Nombre 2',
            selector: row => row.segundoNombre,
            sortable: true,
        },
        {
            name: 'Apellido 1',
            selector: row => row.apellidoPaterno,
            sortable: true,
        },
        {
            name: 'Apellido 2',
            selector: row => row.apellidoMaterno,
            sortable: true,
        },
        {
            name: 'Correo',
            selector: row => row.correo,
            sortable: true,
        },
        {
            name: 'Telefono',
            selector: row => row.telefono,
            sortable: true,
        },
        {
            name: 'Rol',
            selector: row => row.descripcion,
            sortable: true
        },
        {
            name: '',
            cell: row => (
                <>
                    <Link to={`/usuario/edit/${row.idUsuario}`} color="primary" size="sm" className="mr-2"
                    >
                        <i className="fas fa-pen-alt"></i>
                    </Link>

                    <Button color="danger" size="sm"
                        onClick={() => deshabilitarUsuario(row.idUsuario)}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </>
            ),
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                fontSize: '13px',
                fontWeight: 800,
            },
        },
        headRow: {
            style: {
                backgroundColor: "#eee",
            }
        }
    };

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    //procedimineto para desabilitar un usuario
    const deshabilitarUsuario = async (id) => {

        Swal.fire({
            title: 'Esta seguro?',
            text: "Desea eliminar el usuario",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {
                UsuarioService.deshabilitarUsuario(id).then(response => {
                    getUsuarios();

                    Swal.fire(
                        'Eliminado!',
                        'El usuario fue eliminado.',
                        'success'
                    )
                });
                //navigate("/usuarios");
            }
        })
    }


    return (
        <>
            <Card>
                <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>
                    Lista de Usuarios
                </CardHeader>
                <CardBody>
                    <Link to="/usuario/create" className='btn btn-success' size="sm">Nuevo Usuario</Link>
                    <hr></hr>
                    <DataTable
                        columns={columns}
                        data={usuarios}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        customStyles={customStyles}
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default UsuarioList