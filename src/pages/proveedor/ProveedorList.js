
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'

//Sweet Alert
import Swal from 'sweetalert2'

//ReactStrap
import { Card, CardBody, CardHeader, Button } from "reactstrap";

//Services
import ProveedorService from '../../services/proveedor'

const API_URL = 'http://localhost:5000/api/proveedores/'

function ProveedorList() {

    const navigate = useNavigate();

    const [proveedores, setProveedor] = useState([])
    useEffect(() => {
        getProveedores()
    }, [])

    //procedimineto para mostrar todos los proveedores
    const getProveedores = async () => {
        const res = await axios.get(API_URL)
        setProveedor(res.data)
    }

    //Columnas tabla
    const columns = [
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Apellido',
            selector: row => row.apellido,
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
            name: '',
            cell: row => (
                <>
                    <Link to={`/proveedor/edit/${row.idProveedor}`} color="primary" size="sm" className="mr-2"
                    >
                        <i className="fas fa-pen-alt"></i>
                    </Link>

                    <Button color="danger" size="sm"
                        onClick={() => deshabilitarProveedor(row.idProveedor)}
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
    const deshabilitarProveedor = async (id) => {

        Swal.fire({
            title: 'Esta seguro?',
            text: "Desea eliminar el proveedor",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {
                ProveedorService.deshabilitarProveedor(id).then(response => {
                    getProveedores();

                    Swal.fire(
                        'Eliminado!',
                        'El proveedor fue eliminado.',
                        'success'
                    )
                });
                //navigate("/proveedores");
            }
        })
    }


    return (
        <>
            <Card>
                <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>
                    Lista de Proveedores
                </CardHeader>
                <CardBody>
                    <Link to="/proveedor/create" className='btn btn-success' size="sm">Nuevo Proveedor</Link>
                    <hr></hr>
                    <DataTable
                        columns={columns}
                        data={proveedores}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        customStyles={customStyles}
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default ProveedorList