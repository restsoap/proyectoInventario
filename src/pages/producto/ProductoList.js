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

const API_URL = 'http://localhost:5000/api/productos/'

function ProductoList() {

    const navigate = useNavigate();

    const [productos, setProducto] = useState([])
    useEffect(() => {
        getProductos()
    }, [])

    //procedimineto para mostrar todos los productos
    const getProductos = async () => {
        const res = await axios.get(API_URL)
        setProducto(res.data)
    }

    //Columnas tabla
    const columns = [
        {
            name: 'Descripción',
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
            name: '',
            cell: row => (
                <>
                    <Link to={`/producto/edit/${row.idProducto}`} color="primary" size="sm" className="mr-2"
                    >
                        <i className="fas fa-pen-alt"></i>
                    </Link>

                    <Button color="danger" size="sm"
                        onClick={() => deshabilitarProducto(row.idProducto)}
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
    const deshabilitarProducto = async (id) => {

        Swal.fire({
            title: 'Esta seguro?',
            text: "Desea eliminar el producto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {
                ProductoService.deshabilitarProducto(id).then(response => {
                    getProductos();

                    Swal.fire(
                        'Eliminado!',
                        'El producto fue eliminado.',
                        'success'
                    )
                });
                //navigate("/productos");
            }
        })
    }


    return (
        <>
            <Card>
                <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>
                    Lista de Productos
                </CardHeader>
                <CardBody>
                    <Link to="/producto/create" className='btn btn-success' size="sm">Nuevo Producto</Link>
                    <hr></hr>
                    <DataTable
                        columns={columns}
                        data={productos}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        customStyles={customStyles}
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default ProductoList