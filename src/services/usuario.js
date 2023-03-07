import http from '../http-common';

const getAll = () => {
  return http.get("/usuarios");
};

const get = id => {
  return http.get(`/usuarios/${id}`);
};

const create = data => {
  return http.post("/usuarios", data);
};

export const updateUsuario = async (id, data) => {
  return await fetch(`http://localhost:5000/api/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "primerNombre": String(data.primerNombre).trim(),
      "segundoNombre": String(data.segundoNombre).trim(),
      "apellidoPaterno": String(data.apellidoPaterno).trim(),
      "apellidoMaterno": String(data.apellidoMaterno).trim(),
      "telefono": String(data.telefono).trim(),
      "correo": String(data.correo).trim(),
      "contraseña": String(data.contraseña).trim(),
      "idRol": parseInt(data.idRol),
      "estado": String(data.estado).trim()
    })
  });
};

export const deshabilitarUsuario = async (id) => {
  const res = await http.get(`/usuarios/${id}`)

  return await fetch(`http://localhost:5000/api/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "primerNombre": res.data[0].primerNombre,
      "segundoNombre": res.data[0].segundoNombre,
      "apellidoPaterno": res.data[0].apellidoPaterno,
      "apellidoMaterno": res.data[0].apellidoMaterno,
      "telefono": res.data[0].telefono,
      "correo": res.data[0].correo,
      "contraseña": res.data[0].contraseña,
      "idRol": res.data[0].idRol,
      "estado": "Inactivo"
    })
  });
}

/*
const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);
};
*/


const UsuarioService = {
  getAll,
  get,
  create,
  updateUsuario,
  deshabilitarUsuario
  //findByTitle
};

export default UsuarioService;