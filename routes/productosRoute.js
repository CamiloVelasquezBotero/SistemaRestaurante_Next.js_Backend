import express from 'express';
import { 
    agregarProducto,
    obtenerProductos,
    editarProducto,
    eliminarProducto
} from '../controllers/productosController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/',checkAuth, agregarProducto);
router.get('/',checkAuth, obtenerProductos);
router.route('/:productoId')
    .put(checkAuth, editarProducto)
    .delete(checkAuth, eliminarProducto)

export default router;