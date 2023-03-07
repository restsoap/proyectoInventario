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
import EntradaService from '../../services/entrada'

const API_URL = 'http://localhost:5000/api/entrada/'

function EntradaList() {

    const navigate = useNavigate();

    const [entradas, setEntrada] = useState([])
    useEffect(() => {
        getEntradas()
    }, [])

    //procedimineto para mostrar todos los entradas
    const getEntradas = async () => {
        const res = await axios.get(API_URL)
        setEntrada(res.data)
    }

    //Columnas tabla
    const columns = [
        {
            name: 'ID Proveedor',
            selector: row => row.idProveedor,
            sortable: true
        },
        {
            name: 'Producto',
            selector: row => row.descripcion,
            sortable: true,
        },
        {
            name: 'Almacen',
            selector: row => row.almacen,
            sortable: true,
        },
        
        {
            name: 'Categoría',
            selector: row => row.idCategoria,
            sortable: true,
        },

        {
            name: 'Precio Compra',
            selector: row => row.precioCompra,
            sortable: true
        },

        {
            name: 'Precio Venta',
            selector: row => row.precioVenta,
            sortable: true
        },

        {
            name: 'Stock',
            selector: row => row.stock,
            sortable: true
        },

        {
            name: '',
            cell: row => (
                <>
                    <Link to={`/entrada/edit/${row.idEntrada}`} color="primary" size="sm" className="mr-2"
                    >
                        <i className="fas fa-pen-alt"></i>
                    </Link>

                    <Button color="danger" size="sm"
                        onClick={() => deshabilitarEntradaProd(row.idProducto, row.idEntrada)}
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
    const deshabilitarEntradaProd = async (id, idEntrada) => {
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
                ProductoService.deshabilitarEntrada(id).then(response => {
                    getEntradas();

                    Swal.fire(
                        'Eliminado!',
                        'La entrada fue eliminada.',
                        'success'
                    )
                });

                EntradaService.deshabilitarEntrada(idEntrada);
                //navigate("/entradas");
            }
        })
    }


    return (
        <>
            <Card>
                <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>
                    Lista de Entradas
                </CardHeader>
                <CardBody>
                    <Link to="/entrada/create" className='btn btn-success' size="sm">Nueva Entrada</Link>
                    <hr></hr>
                    <DataTable
                        columns={columns}
                        data={entradas}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        customStyles={customStyles}
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default EntradaList