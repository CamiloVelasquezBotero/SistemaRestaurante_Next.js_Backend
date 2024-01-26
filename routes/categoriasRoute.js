import express from 'express';

import { 
    agregarCategoria,
    obtenerCategorias,
    obtenerCategoria,
    editarCategoria,
    eliminarCategoria
} from '../controllers/categoriasController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/', checkAuth, agregarCategoria);
router.get('/', checkAuth, obtenerCategorias);
router.route('/:id')
    .get(checkAuth, obtenerCategoria)
    .put(checkAuth, editarCategoria)
    .delete(checkAuth, eliminarCategoria);

export default router;