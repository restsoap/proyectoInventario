import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductoService from './../../services/producto';

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

const ProductoEdit = () => {
    const [descripcion, setDescripcion] = useState('')
    const [almacen, setAlmacen] = useState('')
    const [idCategoria, setIC] = useState('')
    const [estado, setEstado] = useState('')
    const { id } = useParams()
    const params = useParams();
    const navigate = useNavigate()

    /*
    //procedimiento guardar
    const update = async (e) => {
        e.preventDefault()
        
        await axios.put(API_URL + id, {
            descripcion: descripcion,
            almacen: almacen,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            telefono: telefono,
            correo: correo,
            contraseña: contraseña,
            idCategoria: idCategoria
        })
        
        navigate('/usuarios')
    }
*/
    useEffect(() => {
        //axios.get(API_URL, { idUsuario: params.idUsuario }).then(res => {
        ProductoService.get(params.id).then(res => {
            console.log(res.data[0]);
            const dataProducto = res.data[0];
            setDescripcion(dataProducto.descripcion)
            setAlmacen(dataProducto.almacen)
            setEstado(dataProducto.estado)
            setIC(dataProducto.idCategoria)
        })
    }, []) // eslint-disable-next-line

    const actualzarProducto = async (e) => {

        //const idUsuario = parseInt(params.id);

        e.preventDefault();

        const update = {
            descripcion: descripcion,
            almacen: almacen,
            idCategoria: idCategoria,
            estado: estado
            //idUsuario: params.idUsuario
        }

        console.log(update);
        console.log(id);

        try {
            await ProductoService.updateProducto(id, update).then(res => {
                Swal.fire(
                    'Guardado',
                    '¡Se ha actualizado con exito!',
                    'success'
                )
                navigate('/producto')
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
                <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>Editar Producto</CardHeader>
                <CardBody>
                    <Form onSubmit={actualzarProducto}>

                        <FormGroup>
                            <Label for="descripcion">Descripción</Label>
                            <Input
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="almacen">Almacen</Label>
                            <Input
                                value={almacen}
                                onChange={(e) => setAlmacen(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="idCategoria">Categoría</Label>
                            <select value={idCategoria} onChange={(e) => setIC(e.target.value)} className='form-select'>
                                <option selected value='0'>Seleccione una opción</option>
                                <option value='1'>Movil</option>
                            </select>
                        </FormGroup>

                        <Button type='submit' color="info">Editar</Button>
                        <Link to="/producto" className="btn btn-secondary">Volver</Link>

                    </Form>
                </CardBody>
            </Card>
        </Container>
    )
}

export default ProductoEdit