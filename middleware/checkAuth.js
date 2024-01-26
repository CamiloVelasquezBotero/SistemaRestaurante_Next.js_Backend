import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js'

const checkAuth = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.PALABRA_SECRETA);

            // Envio datos del usuario en el req al sigueinte middleware...
            req.usuario = await Usuario.findById(decoded.id).select('-password -confirmado -token -createdAt -updatedAt -__v')
            return next(); /* Puede seguir al sigueinte middleware */
        } catch (error) {
            console.error(`Error al desencriptar token con jwt: ${error}`)
            return res.status(404).json({msg: 'Token no valido'});
        }
    } else {
        const error = new Error('Token no valido', token);
        return res.status(404).json({msg: error.message});
    }
}

export default checkAuth;