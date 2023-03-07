import http from '../http-common';

const getAll = () => {
  return http.get("/inventario");
};

const InventarioService = {
    getAll
}

export default InventarioService;