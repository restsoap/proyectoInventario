import React, { useState } from "react";
import UsuarioService from './../../services/usuario';
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


const UsuarioForm = () => {

    const initialTutorialState = {
        idUsuario: 0,
        primerNombre: "",
        segundoNombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        telefono: "",
        correo: "",
        contraseña: "",
        idRol: 0
    };
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(initialTutorialState);
    //const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const agregarUsuario = () => {
        var data = {
            primerNombre: usuario.primerNombre,
            segundoNombre: usuario.segundoNombre,
            apellidoPaterno: usuario.apellidoPaterno,
            apellidoMaterno: usuario.apellidoMaterno,
            correo: usuario.correo,
            telefono: usuario.telefono,
            contraseña: usuario.contraseña,
            idRol: usuario.idRol,
        };

        UsuarioService.create(data)
            .then(response => {
                setUsuario({
                    //id: response.data.id,
                    primerNombre: response.data.primerNombre,
                    segundoNombre: response.data.segundoNombre,
                    apellidoPaterno: response.data.apellidoPaterno,
                    apellidoMaterno: response.data.apellidoMaterno,
                    telefono: response.data.telefono,
                    correo: response.data.correo,
                    contraseña: response.data.contraseña,
                    idRol: response.data.idRol
                });
                Swal.fire(
                    'Guardado',
                    '¡Se ha registrado con exito!',
                    'success'
                )
                navigate('/usuario');
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
        {value: '1', label:'Administrador'},
        {value: '2', label:'Empleado'}
    ]


    return (
        <Container className="p-5">
            <Card>
                <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>Crear Usuario</CardHeader>
                <CardBody>
                    <Form>

                        <FormGroup>
                            <Label for="primerNombre">Primer Nombre</Label>
                            <Input
                                name='primerNombre'
                                value={usuario.primerNombre}
                                onChange={handleInputChange}
                                type="text"
                                className='form-control'
                            />
                            
                        </FormGroup>

                        <FormGroup>
                            <Label for="segundoNombre">Segundo Nombre</Label>
                            <Input
                                name="segundoNombre"
                                value={usuario.segundoNombre}
                                onChange={handleInputChange}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="apellidoPaterno">Apellido Paterno</Label>
                            <Input
                                name="apellidoPaterno"
                                value={usuario.apellidoPaterno}
                                onChange={handleInputChange}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="apellidoMaterno">Apellido Materno</Label>
                            <Input
                                name="apellidoMaterno"
                                value={usuario.apellidoMaterno}
                                onChange={handleInputChange}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="correo">Correo</Label>
                            <input
                                name="correo"
                                value={usuario.correo}
                                onChange={handleInputChange}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="telefono">Telefono</Label>
                            <Input
                                name="telefono"
                                value={usuario.telefono}
                                onChange={handleInputChange}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="contraseña">Contraseña</Label>
                            <Input
                                name="contraseña"
                                value={usuario.contraseña}
                                onChange={handleInputChange}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="idRol">Rol</Label>
                            <select className="form-select" name="idRol" defaultValue={usuario.idRol} onChange={handleInputChange}>
                                <option selected value='0'>Seleccione una opción</option>
                                <option value='1'>Administrador</option>
                                <option value='2'>Empleado</option>
                            </select>
                        </FormGroup>

                        <Button onClick={agregarUsuario} color="info">
                            Guardar
                        </Button>

                        <Link to="/usuario" className="btn btn-secondary">Volver</Link>

                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default UsuarioForm;