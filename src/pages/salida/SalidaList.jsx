import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'

//Sweet Alert
import Swal from 'sweetalert2'

//ReactStrap
import { Card, CardBody, CardHeader, Button } from "reactstrap";

//Services
import ProductoService from '../../services/producto'
import SalidaService from '../../services/salida'

const API_URL = 'http://localhost:5000/api/salida'

function SalidaList() {

    const navigate = useNavigate();

    const [salidas, setSalida] = useState([])
    useEffect(() => {
        getSalidas()
    }, [])

    //procedimineto para mostrar todos los salidas
    const getSalidas = async () => {
        const res = await axios.get(API_URL)
        //console.log(res.data)
        setSalida(res.data)
    }

    //Columnas tabla
    const columns = [
        {
            name: 'Codigo',
            selector: row => row.idSalida,
            sortable: true
        },

        {
            name: 'ID Cliente',
            selector: row => row.idCliente,
            sortable: true,
        },

        {
            name: 'Producto',
            selector: row => row.descripcion,
            sortable: true,
        },
        {
            name: 'Categoría',
            selector: row => row.idCategoria,
            sortable: true,
        },

        {
            name: 'Cantidad',
            selector: row => row.cantidadProducto,
            sortable: true
        },
        
        {
            name: 'Precio',
            selector: row => row.precioCompra,
            sortable: true
        },

        {
            name: 'Subtotal',
            selector: row => row.subtotal,
            sortable: true
        },

        {
            name: '',
            cell: row => (
                <>
                    <Link to={`/salida/edit/${row.idSalida}`} color="primary" size="sm" className="mr-2"
                    >
                        <i className="fas fa-pen-alt"></i>
                    </Link>

                    <Button color="danger" size="sm"
                        onClick={() => deshabilitarSalidaProd(row.idProducto, row.idSalida)}
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
    const deshabilitarSalidaProd = async (id, idSalida) => {
        console.log(id)
        Swal.fire({
            title: 'Esta seguro?',
            text: "Desea eliminar la entrada",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {
                ProductoService.deshabilitarSalida(id).then(response => {
                    getSalidas();

                    Swal.fire(
                        'Eliminado!',
                        'La entrada fue eliminada.',
                        'success'
                    )
                });

                SalidaService.deshabilitarSalida(idSalida);
                //navigate("/salidas");
            }
        })
    }


    return (
        <>
            <Card>
                <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>
                    Lista de Salidas
                </CardHeader>
                <CardBody>
                    <Link to="/salida/create" className='btn btn-success' size="sm">Nueva Salida</Link>
                    <hr></hr>
                    <DataTable
                        columns={columns}
                        data={salidas}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        customStyles={customStyles}
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default SalidaList
