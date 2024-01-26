import express from 'express'
import { 
    registrarUsuario,
    confirmarCuenta,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    obtenerPerfil,
    obtenerNombreUsuario
} from '../controllers/usuariosController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/', registrarUsuario);
router.get('/confirmar/:token', confirmarCuenta);
router.post('/login', autenticar);
router.post('/olvidePassword', olvidePassword)
router.route('/olvidePassword/:token')
    .get(comprobarToken)
    .post(nuevoPassword)

router.get('/perfil', checkAuth, obtenerPerfil)

router.get('/obtenerUsuario/:usuarioID', obtenerNombreUsuario)

export default router;