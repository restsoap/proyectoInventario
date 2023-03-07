import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClienteService from './../../services/cliente';

//Sweet Alert
import Swal from 'sweetalert2'

//const API_URL = 'http://localhost:5000/api/usuarios/'

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

const ClienteEdit = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [estado, setEstado] = useState('')
    const { id } = useParams()
    const params = useParams();
    const navigate = useNavigate()

    /*
    //procedimiento guardar
    const update = async (e) => {
        e.preventDefault()
        
        await axios.put(API_URL + id, {
            nombre: nombre,
            apellido: apellido,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            telefono: telefono,
            correo: correo,
            contraseña: contraseña,
            idRol: idRol
        })
        
        navigate('/usuarios')
    }
*/
    useEffect(() => {
        //axios.get(API_URL, { idUsuario: params.idUsuario }).then(res => {
        ClienteService.get(params.id).then(res => {
            console.log(res.data[0]);
            const dataCliente = res.data[0];
            setNombre(dataCliente.nombre)
            setApellido(dataCliente.apellido)
            setTelefono(dataCliente.telefono)
            setCorreo(dataCliente.correo)
            setEstado(dataCliente.estado)
        })
    }, []) // eslint-disable-next-line

    const actualizarCliente = async (e) => {

        //const idUsuario = parseInt(params.id);

        e.preventDefault();

        const update = {
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            correo: correo,
            estado: estado
            //idUsuario: params.idUsuario
        }

        console.log(update);
        console.log(id);

        try {
            await ClienteService.updateCliente(id, update).then(res => {
                Swal.fire(
                    'Guardado',
                    '¡Se ha actualizado con exito!',
                    'success'
                )
                navigate('/cliente')
            })
        } catch (error) {
            Swal.fire(
                'Opp!',
                'No se pudo guardar.',
                'warning'
            )
            console.log(error);
        }
    }

    return (
        <Container className="p-5">
            <Card>
                <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>Editar Cliente</CardHeader>
                <CardBody>
                    <Form onSubmit={actualizarCliente}>

                        <FormGroup>
                            <Label for="nombre">Nombre</Label>
                            <Input
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="apellido">Apellido</Label>
                            <Input
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="correo">Correo</Label>
                            <Input
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="telefono">Telefono</Label>
                            <Input
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <Button type='submit' color="info">Editar</Button>
                        <Link to="/cliente" className="btn btn-secondary">Volver</Link>

                    </Form>
                </CardBody>
            </Card>
        </Container>
    )
}

export default ClienteEdit