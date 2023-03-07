import React, { useState, useEffect } from "react";
import ProductoService from './../../services/producto';
import SalidaService from "../../services/salida";
import ClienteService from "../../services/cliente";
import { Link, useNavigate, useParams } from 'react-router-dom';
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



const SalidaEdit = () => {
    const initialTutorialState = {
        idSalida: 0,
        idProducto: 0,
        idCliente: 0,
        cantidadProducto: 0,
        subtotal: 0,
        
    };

    const initialProductoState = {
        stock: 0
    }
    const navigate = useNavigate();
    const [producto, setProducto] = useState(initialProductoState);
    const [salida, setSalida] = useState(initialTutorialState);
    const [verModal, setVerModal] = useState(false);
    const [verModal2, setVerModal2] = useState(false);
    const [dataProd, setDataProducto] = useState('');
    const [cantAct, setDataCantidad] = useState({cantidadProducto: 0})
    const params = useParams();

    //-------------------------------------------------------- FORMULARIO SALIDA -----------------------------------------------------------------------------

    const handleInputChange = event => {
        const { name, value } = event.target;
        setProducto({ ...producto, [name]: value });
        setSalida({ ...salida, [name]: value });
    };

    const editarSalida = () => {
        var dataProducto

        var dataSalida = {
            idProducto: salida.idProducto,
            idCliente: salida.idCliente,
            cantidadProducto: salida.cantidadProducto,
            subtotal: dataProd.precioCompra * salida.cantidadProducto,
            estado: salida.estado,
        };

        console.log(cantAct.cantidadProducto)

        if(cantAct.cantidadProducto > salida.cantidadProducto){
            const residuo = (cantAct.cantidadProducto - salida.cantidadProducto)
            dataProducto = {
                stock: producto.stock + residuo
            }
        }else{
            const residuo2 = salida.cantidadProducto - cantAct.cantidadProducto
            dataProducto = {
                stock: producto.stock - residuo2
            }
        }


        SalidaService.updateSalida(params.id,dataSalida)
            .then(response => {
                /*
                setSalida({
                    //id: response.data.id,
                    idProducto: response.dataSalida.idProducto,
                    idCliente: response.dataSalida.idCliente,
                });
                //console.log(response.data);
                navigate('/salida');
                */
            })
            .catch(e => {
                console.log(e);
                //band = false;
            });

        ProductoService.updateProductoSalida(salida.idProducto, dataProducto)
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
                    '¡Se ha actualizado con exito!',
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
        navigate('/salida')
    };

    //--------------------------------------------------- MODAL LISTA CLIENTES ---------------------------------------------------------------------------
    const [clientes, setCliente] = useState([])
    const [dataCliente, setDataCliente] = useState('');

    const abrirModal = () => {
        setVerModal(!verModal);
    }

    //procedimineto para mostrar todos los clientes
    const getClientes = async () => {
        await ClienteService.getAll().then(response => {
            setCliente(response.data)
        })
    }

    const getClienteModal = async (data) => {
        //console.log(data.idCliente);
        setDataCliente(data);
        //setSalida({ idCliente: data.idCliente })
        salida.idCliente = data.idCliente;
        setVerModal(!verModal);
    }

    //Columnas tabla
    const columnsCliente = [
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
                        onClick={() => getClienteModal(row)}
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

    const getDataForm = () => {

        SalidaService.get(params.id).then(response => {
            const dataE = response.data[0];
            setSalida(dataE)
            setProducto(dataE)
            setDataProducto(dataE)
            setDataCliente(dataE)
            setDataCantidad(dataE)
        })
    }

    useEffect(() => {
        getClientes()
        getDataForm()
    }, [])

    return (
        <>
            <Container className="p-5">
                <Card>
                    <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>Crear Salida</CardHeader>
                    <CardBody>
                        <Form>
                            <Row className="row-cols-lg g-3 align-items-center">
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="idProducto">ID Producto</Label>
                                        <Input
                                            name='idProducto'
                                            value={salida.idProducto || ''}
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
                                            value={dataProd.descripcion || ''}
                                            type="text"
                                            className='form-control'
                                            disabled='disabled'
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="row-cols-lg g-3 align-items-center">
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="idCliente">ID Cliente</Label>
                                        <Input
                                            name="idCliente"
                                            value={salida.idCliente || ''}
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
                                            value={dataCliente.nombre || ''}
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
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="cantidadProducto">Cantidad</Label>
                                        <Input
                                            name="cantidadProducto"
                                            onChange={handleInputChange}
                                            value={salida.cantidadProducto || ''}
                                            type="number"
                                            className='form-control'
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="stock">Stock</Label>
                                        <Input
                                            name="stock"
                                            onChange={handleInputChange}
                                            value={producto.stock || ''}
                                            type="number"
                                            className='form-control'
                                            disabled='disabled'
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="precioCompra">Precio</Label>
                                        <Input
                                            name="precioCompra"
                                            onChange={handleInputChange}
                                            value={dataProd.precioCompra || ''}
                                            type="number"
                                            className='form-control'
                                            disabled='disabled'
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Button onClick={editarSalida} color="info">
                                Guardar
                            </Button>

                            <Link to="/salida" className="btn btn-secondary">Volver</Link>

                        </Form>
                    </CardBody>
                </Card>
            </Container>

            <Modal isOpen={verModal}>
                <ModalBody>
                    <Card>
                        <CardHeader style={{ backgroundColor: '#884EA0', color: "white" }}>
                            Lista de Clientes
                        </CardHeader>
                        <CardBody>
                            <Link className='btn btn-danger' onClick={() => abrirModal(!verModal)} size="sm"><i className="fas fa-times-circle"></i></Link>
                            <hr></hr>
                            <DataTable
                                columns={columnsCliente}
                                data={clientes}
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

export default SalidaEdit;