import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UsuarioService from './../../services/usuario';

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

const UsuarioEdit = () => {
    const [primerNombre, setPN] = useState('')
    const [segundoNombre, setSN] = useState('')
    const [apellidoPaterno, setAP] = useState('')
    const [apellidoMaterno, setAM] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [idRol, setIR] = useState('')
    const [estado, setEstado] = useState('')
    const { id } = useParams()
    const params = useParams();
    const navigate = useNavigate()

    /*
    //procedimiento guardar
    const update = async (e) => {
        e.preventDefault()
        
        await axios.put(API_URL + id, {
            primerNombre: primerNombre,
            segundoNombre: segundoNombre,
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
        UsuarioService.get(params.id).then(res => {
            console.log(res.data[0]);
            const dataUsuario = res.data[0];
            setPN(dataUsuario.primerNombre)
            setSN(dataUsuario.segundoNombre)
            setAP(dataUsuario.apellidoPaterno)
            setAM(dataUsuario.apellidoMaterno)
            setTelefono(dataUsuario.telefono)
            setCorreo(dataUsuario.correo)
            setContraseña(dataUsuario.contraseña)
            setEstado(dataUsuario.estado)
            setIR(dataUsuario.idRol)
        })
    }, []) // eslint-disable-next-line

    const actualizarUsuario = async (e) => {

        //const idUsuario = parseInt(params.id);

        e.preventDefault();

        const update = {
            primerNombre: primerNombre,
            segundoNombre: segundoNombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            telefono: telefono,
            correo: correo,
            contraseña: contraseña,
            idRol: idRol,
            estado: estado
            //idUsuario: params.idUsuario
        }

        console.log(update);
        console.log(id);

        try {
            await UsuarioService.updateUsuario(id, update).then(res => {
                //alert(res.data);
                Swal.fire(
                    'Guardado',
                    '¡Se ha actualizado con exito!',
                    'success'
                )
                navigate('/usuario')
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
                <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>Editar Usuario</CardHeader>
                <CardBody>
                    <Form onSubmit={actualizarUsuario}>

                        <FormGroup>
                            <Label for="primerNombre">Primer Nombre</Label>
                            <Input
                                value={primerNombre}
                                onChange={(e) => setPN(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="segundoNombre">Segundo Nombre</Label>
                            <Input
                                value={segundoNombre}
                                onChange={(e) => setSN(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="apellidoPaterno">Apellido Paterno</Label>
                            <Input
                                value={apellidoPaterno}
                                onChange={(e) => setAP(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="apellidoMaterno">Apellido Materno</Label>
                            <Input
                                value={apellidoMaterno}
                                onChange={(e) => setAM(e.target.value)}
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

                        <FormGroup>
                            <Label for="contraseña">Contraseña</Label>
                            <Input
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="idRol">Rol</Label>
                            <select value={idRol} onChange={(e) => setIR(e.target.value)} className='form-select'>
                                <option selected value='0'>Seleccione una opción</option>
                                <option value='1'>Administrador</option>
                                <option value='2'>Empleado</option>
                            </select>
                        </FormGroup>

                        <Button type='submit' color="info">Editar</Button>
                        <Link to="/usuario" className="btn btn-secondary">Volver</Link>

                    </Form>
                </CardBody>
            </Card>
        </Container>
    )
}

export default UsuarioEdit