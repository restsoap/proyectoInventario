import React, { useState } from "react";
import ClienteService from './../../services/cliente';
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


const ClienteForm = () => {
    const initialTutorialState = {
        idCliente: 0,
        nombre: "",
        apellido: "",
        correo: "",
        telefono: ""
    };
    const navigate = useNavigate();
    const [cliente, setCliente] = useState(initialTutorialState);
    //const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCliente({ ...cliente, [name]: value });
    };

    const agregarCliente = () => {
        var data = {
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            correo: cliente.correo,
            telefono: cliente.telefono,
        };

        ClienteService.create(data)
            .then(response => {
                setCliente({
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
                navigate('/cliente');
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
                <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>Crear Cliente</CardHeader>
                <CardBody>
                    <Form>

                        <FormGroup>
                            <Label for="nombre">Nombre</Label>
                            <Input
                                name='nombre'
                                value={cliente.nombre}
                                onChange={handleInputChange}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="apellido">Apellido</Label>
                            <Input
                                name="apellido"
                                value={cliente.apellido}
                                onChange={handleInputChange}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="correo">Correo</Label>
                            <input
                                name="correo"
                                value={cliente.correo}
                                onChange={handleInputChange}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="telefono">Telefono</Label>
                            <Input
                                name="telefono"
                                value={cliente.telefono}
                                onChange={handleInputChange}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <Button onClick={agregarCliente} color="info">
                            Guardar
                        </Button>

                        <Link to="/cliente" className="btn btn-secondary">Volver</Link>

                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default ClienteForm;