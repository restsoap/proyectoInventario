import React, { useState } from "react";
import ProveedorService from './../../services/proveedor';
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


const ProveedorForm = () => {
    const initialTutorialState = {
        idProveedor: 0,
        nombre: "",
        apellido: "",
        correo: "",
        telefono: ""
    };
    const navigate = useNavigate();
    const [proveedor, setProveedor] = useState(initialTutorialState);
    //const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setProveedor({ ...proveedor, [name]: value });
    };

    const agregarProveedor = () => {
        var data = {
            nombre: proveedor.nombre,
            apellido: proveedor.apellido,
            correo: proveedor.correo,
            telefono: proveedor.telefono,
        };

        ProveedorService.create(data)
            .then(response => {
                setProveedor({
                    //id: response.data.id,
                    nombre: response.data.nombre,
                    apellido: response.data.apellido,
                    telefono: response.data.telefono,
                    correo: response.data.correo,
                });
                Swal.fire(
                    'Guardado',
                    '¡Se ha registrado con exito!',
                    'success'
                )
                navigate('/proveedor');
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


    return (
        <Container className="p-5">
            <Card>
                <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>Crear Proveedor</CardHeader>
                <CardBody>
                    <Form>

                        <FormGroup>
                            <Label for="nombre">Nombre</Label>
                            <Input
                                name='nombre'
                                value={proveedor.nombre}
                                onChange={handleInputChange}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="apellido">Apellido</Label>
                            <Input
                                name="apellido"
                                value={proveedor.apellido}
                                onChange={handleInputChange}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="correo">Correo</Label>
                            <input
                                name="correo"
                                value={proveedor.correo}
                                onChange={handleInputChange}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="telefono">Telefono</Label>
                            <Input
                                name="telefono"
                                value={proveedor.telefono}
                                onChange={handleInputChange}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <Button onClick={agregarProveedor} color="info">
                            Guardar
                        </Button>

                        <Link to="/proveedor" className="btn btn-secondary">Volver</Link>

                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default ProveedorForm;