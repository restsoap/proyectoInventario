import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { Document } from '@react-pdf/renderer'

//Sweet Alert
import Swal from 'sweetalert2'

//ReactStrap
import { Card, CardBody, CardHeader, Button } from "reactstrap";


const API_URL = 'http://localhost:5000/api/inventario/'

function Informe() {

    const navigate = useNavigate();

    const [productos, setProducto] = useState([])
    useEffect(() => {
        getProductos()
    }, [])

    //procedimineto para mostrar todos los productos
    const getProductos = async () => {
        const res = await axios.get(API_URL)
        console.log(res.data);
        setProducto(res.data)
    }

    //Columnas tabla
    const columns = [
        {
            name: 'ID Producto',
            selector: row => row.idProducto,
            sortable: true,
        },
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
            name: 'Stock Actual',
            selector: row => row.stock,
            sortable: true,
        },
        {
            name: 'Total Ingresos',
            selector: row => row.subtotal,
            sortable: true,
        },
        {
            name: 'Total Egresos',
            selector: row => row.totalEgresos,
            sortable: true,
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




    return (
        <>
            <Document>
                <Card>

                    <CardBody>
                        <hr></hr>
                        <DataTable
                            columns={columns}
                            data={productos}
                            customStyles={customStyles}
                        />
                    </CardBody>
                </Card>
            </Document>
        </>
    )
}

export default Informe