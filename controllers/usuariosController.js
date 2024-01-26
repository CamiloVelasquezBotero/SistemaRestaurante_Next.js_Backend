import Usuario from "../models/Usuario.js"
import generarId from '../helpers/generarId.js';
import { emailRegistro, emailOLvidePassword } from "../helpers/emails.js";
import generarJWT from '../helpers/generarJWT.js';

export const registrarUsuario = async (req, res) => {
    const { email, nombre } = req.body;

    // Comprobacion de que no exista
    const existeUsuario = await Usuario.findOne({email})
    if(existeUsuario) {
        const error = new Error('Usuario ya registrado!');
        return res.status(400).json({ msg: error.message});
    }

    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId();

        await usuario.save();

        // Enviar Email al Usuario para la confirmacion
        emailRegistro({
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token
        })

        res.json({msg: 'Usuario creado correctamente, Revisa tu Email para confirmar tu cuenta'})
    } catch (error) {
        console.error('Error al crear el usuario: ', error)
    }
}

export const confirmarCuenta = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({token});

    if(!usuarioConfirmar) {
        const error = new Error('Token no valido!')
        return res.status(400).json({msg: error.message})
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = '';
        await usuarioConfirmar.save();

        res.json({msg: 'Usuario confirmado correctamente'});
    } catch (error) {
        console.error(`Error al confirmar el usuario: ${error}`)
    }
}

export const autenticar = async (req, res) => {
    const { email, password } = req.body;
    
    const usuario = await Usuario.findOne({email});
    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg : error.message});
    }

    if(!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada aun');
        return res.status(400).json({msg : error.message});
    }

    if(await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        })
    } else {
        const error = new Error('Password incorrecto');
        return res.status(400).json({msg : error.message});
    }
}

export const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({email});

    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg : error.message});
    }

    try {
        usuario.token = generarId();
        await usuario.save();

        emailOLvidePassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })

        res.json({msg: 'Hemos enviado un email para reestablecer tu password'})
    } catch (error) {
        console.error(`Error al enviar emailOlvidePassword ${error}`);
    }
}

export const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenExiste = await Usuario.findOne({token});

    if(tokenExiste) {
        res.json({msg: 'Token valido'})
    } else {
        const error = new Error('Token no valido');
        return res.status(400).json({msg : error.message});
    }
}

export const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const usuario = await Usuario.findOne({token});

    if(!usuario) {
        const error = new Error('Token no valido');
        return res.status(400).json({msg : error.message});
    }

    try {
        usuario.password = password;
        usuario.token = '';
        usuario.save();
        res.json({msg: 'Password modificado correctamente'})
    } catch (error) {
        console.error(`Error al mdoificar el password: ${error}`)
    }
}

export const obtenerPerfil = async (req, res) => {
    const { usuario } = req;

    return res.json(usuario)
}

export const obtenerNombreUsuario = async (req, res) => {
    const { usuarioID } = req.params

    try {
        const cliente = await Usuario.findById(usuarioID)
        
        if(cliente) {
            res.json({nombreUsuario: cliente.nombre})
        }
    } catch (error) {
        console.error(`Error al buscar el usuario por su ID: ${error}`)
        res.status(404).json({msg: 'id no valido'})
    }
}