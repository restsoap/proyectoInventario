import http from '../http-common';

const getAll = () => {
  return http.get("/proveedores");
};

const get = id => {
  return http.get(`/proveedores/${id}`);
};

const create = data => {
  return http.post("/proveedores", data);
};

export const updateProveedor = async (id, data) => {
  return await fetch(`http://localhost:5000/api/proveedores/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "nombre": String(data.nombre).trim(),
      "apellido": String(data.apellido).trim(),
      "telefono": String(data.telefono).trim(),
      "correo": String(data.correo).trim(),
      "estado": String(data.estado).trim()
    })
  });
};

export const deshabilitarProveedor = async (id) => {
  const res = await http.get(`/proveedores/${id}`)

  return await fetch(`http://localhost:5000/api/proveedores/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "nombre": res.data[0].nombre,
        "apellido": res.data[0].apellido,
        "telefono": res.data[0].telefono,
        "correo": res.data[0].correo,
        "estado": "Inactivo"
    })
  });
}

/*
const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);
};
*/


const ProveedorService = {
  getAll,
  get,
  create,
  updateProveedor,
  deshabilitarProveedor
  //findByTitle
};

export default ProveedorService;