import http from '../http-common';

const getAll = () => {
  return http.get("/salida");
};

const create = data => {
  return http.post("/salida", data);
};

const get = id => {
  return http.get(`/salida/${id}`);
};

export const updateSalida = async (id, data) => {
  return await fetch(`http://localhost:5000/api/salida/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "idProducto": parseInt(data.idProducto),
      "idCliente": parseInt(data.idCliente),
      "subtotal": parseFloat(data.subtotal),
      "cantidadProducto": parseInt(data.cantidadProducto),
      "estado": String(data.estado).trim()
    })
  });
}

export const deshabilitarSalida = async (id) => {
  const res = await http.get(`/salida/${id}`)

  return await fetch(`http://localhost:5000/api/salida/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "idProducto": res.data[0].idProducto,
      "idCliente": res.data[0].idCliente,
      "subtotal": res.data[0].subtotal,
      "cantidadProducto": res.data[0].cantidadProducto,
      "estado": "Inactivo"
    })
  });
}


const SalidaService = {
  getAll,
  create,
  get,
  updateSalida,
  deshabilitarSalida
}

export default SalidaService;