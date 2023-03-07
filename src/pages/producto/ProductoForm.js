import React, { useState } from "react";
import ProductoService from './../../services/producto';
import { Link, useNavigate } from 'react-router-dom';

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
} from "reactstrap";


const ProductoForm = () => {
    const initialTutorialState = {
        idProducto: 0,
        descripcion: "",
        almacen: "",
        idCategoria: 0
    };
    const navigate = useNavigate();
    const [producto, setProducto] = useState(initialTutorialState);
    //const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setProducto({ ...producto, [name]: value });
    };

    const agregarProducto = () => {
        var data = {
            descripcion: producto.descripcion,
            almacen: producto.almacen,
            idCategoria: producto.idCategoria,
        };

        ProductoService.create(data)
            .then(response => {
                setProducto({
                    //id: response.data.id,
                    descripcion: response.data.descripcion,
                    almacen: response.data.almacen,
                    idCategoria: response.data.idCategoria
                });
                Swal.fire(
                    'Guardado',
                    '¡Se ha registrado con exito!',
                    'success'
                )
                navigate('/producto');
            })
            .catch(e => {
                Swal.fire(
                    'Opp!',
                    'No se pudo guardar.',
                    'warning'
                )
                console.log(e);
            });
    };

    const options = [
        {value: '1', label:'Movil'},
    ]


    return (
        <Container className="p-5">
            <Card>
                <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>Crear Producto</CardHeader>
                <CardBody>
                    <Form>

                        <FormGroup>
                            <Label for="descripcion">Descripción</Label>
                            <Input
                                name='descripcion'
                                value={producto.descripcion}
                                onChange={handleInputChange}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="almacen">Almacen</Label>
                            <Input
                                name="almacen"
                                value={producto.almacen}
                                onChange={handleInputChange}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="idCategoria">Categoría</Label>
                            <select className="form-select" name="idCategoria" defaultValue={producto.idCategoria} onChange={handleInputChange}>
                                <option selected value='0'>Seleccione una opción</option>
                                <option value='1'>Movil</option>
                            </select>
                        </FormGroup>

                        <Button onClick={agregarProducto} color="info">
                            Guardar
                        </Button>

                        <Link to="/producto" className="btn btn-secondary">Volver</Link>

                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default ProductoForm;