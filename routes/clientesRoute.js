import express from 'express';
import { 
    agregarCliente,
    obtenerNombreUsuarios,
    obtenerNombreUsuario,
    editarCliente,
    eliminarCliente,
} from '../controllers/clientesController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/', checkAuth, agregarCliente);
router.get('/', checkAuth, obtenerNombreUsuarios);
router.route('/:telefono')
    .get(checkAuth, obtenerNombreUsuario)
    .put(checkAuth, editarCliente)
    .delete(checkAuth, eliminarCliente)

export default router;