import express from 'express';
import { 
    agregarPedido ,
    obtenerPedido,
    obtenerPedidos,
    eliminarPedido
} from '../controllers/pedidosController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.route('/')
    .post(checkAuth, agregarPedido)
    .get(checkAuth, obtenerPedidos)

router.route('/:pedidoID')
    .get(checkAuth, obtenerPedido)
    .delete(checkAuth, eliminarPedido)


export default router;