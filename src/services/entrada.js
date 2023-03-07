import http from '../http-common';

const getAll = () => {
  return http.get("/entrada");
};

const create = data => {
  return http.post("/entrada", data);
};

const get = id => {
  return http.get(`/entrada/${id}`);
};

const updateEntrada = async (id, data) => {
  return await fetch(`http://localhost:5000/api/entrada/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "idProducto": parseInt(data.idProducto),
      "idProveedor": parseInt(data.idProveedor),
      "montoTotal": parseFloat(data.montoTotal),
      "estado": String(data.estado).trim()
    })
  });
}

export const deshabilitarEntrada = async (id) => {
  const res = await http.get(`/entrada/${id}`)

  return await fetch(`http://localhost:5000/api/entrada/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "idProducto": res.data[0].idProducto,
      "idProveedor": res.data[0].idProveedor,
      "montoTotal": res.data[0].montoTotal,
      "estado": "Inactivo"
    })
  });
}

const EntradaService = {
  getAll,
  create,
  get,
  updateEntrada,
  deshabilitarEntrada
};

export default EntradaService;