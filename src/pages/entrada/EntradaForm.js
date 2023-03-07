import React, { useState, useEffect } from "react";
import ProductoService from './../../services/producto';
import EntradaService from "../../services/entrada";
import ProveedorService from "../../services/proveedor";
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component'

//import ProveedorList from '../proveedor/ProveedorList';

//Sweet Alert
import Swal from 'sweetalert2'

//ReactStrap
import {
    Container,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    CardBody,
    CardHeader,
    FormFeedback,
    Col,
    Row,
    Modal,
    ModalBody
} from "reactstrap";
import { data } from "jquery";


const EntradaForm = () => {
    const initialTutorialState = {
        idEntrada: 0,
        idProducto: 0,
        idProveedor: 0,

    };

    const initialProductoState = {
        precioCompra: 0,
        precioVenta: 0,
        stock: 0
    }
    const navigate = useNavigate();
    const [producto, setProducto] = useState(initialProductoState);
    const [entrada, setEntrada] = useState(initialTutorialState);
    const [verModal, setVerModal] = useState(false);
    const [verModal2, setVerModal2] = useState(false);
    //-------------------------------------------------------- FORMULARIO ENTRADA -----------------------------------------------------------------------------

    const handleInputChange = event => {
        const { name, value } = event.target;
        setProducto({ ...producto, [name]: value });
        setEntrada({ ...entrada, [name]: value });
    };

    const agregarEntrada = () => {
        var dataEntrada = {
            idProducto: entrada.idProducto,
            idProveedor: entrada.idProveedor,
        };

        var dataProducto = {
            precioCompra: producto.precioCompra,
            precioVenta: producto.precioVenta,
            stock: producto.stock
        }

        EntradaService.create(dataEntrada)
            .then(response => {
                /*
                setEntrada({
                    //id: response.data.id,
                    idProducto: response.dataEntrada.idProducto,
                    idProveedor: response.dataEntrada.idProveedor,
                });
                //console.log(response.data);
                navigate('/entrada');
                */
            })
            .catch(e => {
                Swal.fire(
                    'Opp!',
                    'No se pudo guardar.',
                    'warning'
                )
                console.log(e);
                //band = false;
            });

        ProductoService.updateProductoEntrada(entrada.idProducto, dataProducto)
            .then(response => {
                /*
                setProducto({
                    precioCompra: response.dataProducto.precioCompra,
                    precioVenta: response.dataProducto.precioVenta,
                    stock: response.dataProducto.stock
                });
                //console.log(response.dataProducto);
                */
                Swal.fire(
                    'Guardado',
                    '¡Se ha registrado con exito!',
                    'success'
                )
            })
            .catch(err => {
                Swal.fire(
                    'Opp!',
                    'No se pudo guardar.',
                    'warning'
                )
                console.log(err);
                //band = false;
            })
            navigate('/entrada')
    };

    //--------------------------------------------------- MODAL LISTA PROVEEDORES ---------------------------------------------------------------------------
    const [proveedores, setProveedor] = useState([])
    const [dataProveedor, setDataProveedor] = useState('');

    const abrirModal = () => {
        setVerModal(!verModal);
    }

    //procedimineto para mostrar todos los proveedores
    const getProveedores = async () => {
        await ProveedorService.getAll().then(response => {
            setProveedor(response.data)
        })
    }

    const getProveedorModal = async (data) => {
        //console.log(data.idProveedor);
        setDataProveedor(data);
        //setEntrada({ idProveedor: data.idProveedor })
        entrada.idProveedor = data.idProveedor;
        setVerModal(!verModal);
    }

    //Columnas tabla
    const columnsProveedor = [
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
                    <Button style={{ backgroundColor: '#884EA0', color: "white" }} size="sm"
                        onClick={() => getProveedorModal(row)}
                    >
                        <i className="fas fa-check"></i>
                    </Button>
                </>
            ),
        },
    ];

    //--------------------------------------------------- MODAL LISTA PRODUCTOS ---------------------------------------------------------------------------
    const [productos, setProductos] = useState([])
    const [dataProducto, setDataProducto] = useState('');

    const getProductos = async () => {
        await ProductoService.getAllProdEnIn().then(response => {
            setProductos(response.data)
        })
    }
    const abrirModal2 = () => {
        setVerModal2(!verModal2);
    }

    const getProductoModal = async (dataP) => {
        console.log(dataP);
        setDataProducto(dataP);
        entrada.idProducto = dataP.idProducto;
        setVerModal2(!verModal2);
    }

    //Columnas tabla
    const columnsProducto = [
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
                    <Button style={{ backgroundColor: '#0E6655', color: "white" }} size="sm"
                        onClick={() => getProductoModal(row)}
                    >
                        <i className="fas fa-check"></i>
                    </Button>
                </>
            ),
        },
    ];



    //------------------------------------------------------- ESTILO TABLAS ---------------------------------------------------------------------------------
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

    useEffect(() => {
        getProveedores()
        getProductos()
    }, [])

    return (
        <>
            <Container className="p-5">
                <Card>
                    <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>Crear Entrada</CardHeader>
                    <CardBody>
                        <Form>
                            <Row className="row-cols-lg g-3 align-items-center">
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="idProducto">ID Producto</Label>
                                        <Input
                                            name='idProducto'
                                            value={entrada.idProducto || ''}
                                            onChange={handleInputChange}
                                            type="number"
                                            className='form-control'
                                            disabled='disabled'
                                        />

                                    </FormGroup>
                                </Col>
                                <Col md={8}>
                                    <FormGroup>
                                        <Label for="descripcion">Descripción</Label>
                                        <Input
                                            name="descripcion"
                                            onChange={handleInputChange}
                                            value={dataProducto.descripcion || ''}
                                            type="text"
                                            className='form-control'
                                            disabled='disabled'
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <Button color="info" onClick={() => abrirModal2(!verModal2)}>
                                        <i className="fas fa-search"></i>
                                    </Button>
                                </Col>
                            </Row>
                            <Row className="row-cols-lg g-3 align-items-center">
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="idProveedor">ID Proveedor</Label>
                                        <Input
                                            name="idProveedor"
                                            value={entrada.idProveedor || ''}
                                            onChange={handleInputChange}
                                            type="number"
                                            className='form-control'
                                            disabled='disabled'
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={8}>
                                    <FormGroup>
                                        <Label for="nombre">Nombre</Label>
                                        <Input
                                            name="nombre"
                                            onChange={handleInputChange}
                                            value={dataProveedor.nombre || ''}
                                            type="text"
                                            className='form-control'
                                            disabled='disabled'
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <Button color="info" onClick={() => abrirModal(!verModal)}>
                                        <i className="fas fa-search"></i>
                                    </Button>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="precioCompra">Precio de Compra</Label>
                                <Input
                                    name="precioCompra"
                                    value={producto.precioCompra}
                                    onChange={handleInputChange}
                                    type="number"
                                    className='form-control'
                                    placeholder="00.00"
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="precioVenta">Precio de Venta</Label>
                                <Input
                                    name="precioVenta"
                                    value={producto.precioVenta}
                                    onChange={handleInputChange}
                                    type="number"
                                    className='form-control'
                                    placeholder="00.00"
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="stock">Cantidad Producto</Label>
                                <Input
                                    name="stock"
                                    value={producto.stock}
                                    onChange={handleInputChange}
                                    type="number"
                                    className='form-control'
                                    placeholder="0"
                                />
                            </FormGroup>

                            <Button onClick={agregarEntrada} color="info">
                                Guardar
                            </Button>

                            <Link to="/entrada" className="btn btn-secondary">Volver</Link>

                        </Form>
                    </CardBody>
                </Card>
            </Container>

            <Modal isOpen={verModal2}>
                <ModalBody>
                    <Card>
                        <CardHeader style={{ backgroundColor: '#0E6655', color: "white" }}>
                            Lista de Productos
                        </CardHeader>
                        <CardBody>
                            <Link className='btn btn-danger' onClick={() => abrirModal2(!verModal2)} size="sm"><i className="fas fa-times-circle"></i></Link>
                            <hr></hr>
                            <DataTable
                                columns={columnsProducto}
                                data={productos}
                                pagination
                                paginationComponentOptions={paginationComponentOptions}
                                customStyles={customStyles}
                            />
                        </CardBody>
                    </Card>
                </ModalBody>

            </Modal>

            <Modal isOpen={verModal}>
                <ModalBody>
                    <Card>
                        <CardHeader style={{ backgroundColor: '#884EA0', color: "white" }}>
                            Lista de Proveedores
                        </CardHeader>
                        <CardBody>
                            <Link className='btn btn-danger' onClick={() => abrirModal(!verModal)} size="sm"><i className="fas fa-times-circle"></i></Link>
                            <hr></hr>
                            <DataTable
                                columns={columnsProveedor}
                                data={proveedores}
                                pagination
                                paginationComponentOptions={paginationComponentOptions}
                                customStyles={customStyles}
                            />
                        </CardBody>
                    </Card>
                </ModalBody>

            </Modal>

        </>
    );
};

export default EntradaForm;