import mongoose from 'mongoose';
import Cliente from '../models/Cliente.js'

export const agregarCliente = async (req, res) => {
    const { telefono } = req.body;
    const existeCliente = await Cliente.findOne({telefono});
    
    // Si existe le enviamos el cliente
    if(existeCliente) {
        const error = new Error('Este cliente ya existe')
        return res.status(404).json({msg: error.message})
    } else {
        const cliente = new Cliente(req.body);
        await cliente.save();
        return res.json(cliente)
    }
}

export const obtenerNombreUsuarios = async (req, res) => {
    try {
        const clientes = await Cliente.find({}).select('-updatedAt -__v');
        return res.json(clientes);
    } catch (error) {
        console.error(`Error al consultar los clientes: ${error}`);
    }
}

export const editarCliente = async (req, res) => {
    const { telefono } = req.params;

    const cliente = await Cliente.findOne({telefono});

    if(!cliente) {
        const error = new Error('Cliente no encontrado');
        return res.status(404).json({msg: error.message});
    }

    // Actualizar Cliente
    cliente.nombre = req.body.nombre || cliente.nombre;
    cliente.telefono = Number(req.body.telefono) || cliente.telefono;
    cliente.direccion = req.body.direccion || cliente.direccion;

    try {
        const clienteActualizado = await cliente.save();
        return res.json({msg: 'Cliente Editado Correctamente'}); /* Actualizar vista del frontend */
    } catch (error) {
        console.error(`Error al actualizar el cliente: ${error}`);
    }
}

export const eliminarCliente = async (req, res) => {
    const { telefono } = req.params;

    const cliente = await Cliente.findOne({telefono});

    if(!cliente) {
        const error = new Error('Cliente no encontrado');
        return res.status(404).json({msg: error.message});
    }

    try {
        await cliente.deleteOne();
        res.json({msg: 'Cliente eliminado correctamente'})
    } catch (error) {
        console.error(`Error al eliminar el cliente ${error}`);
    }
}

export const obtenerNombreUsuario = async (req, res) => {s
    const { telefono } = req.params;
    const cliente = await Cliente.findOne({telefono}).select('-__v');
    
    if(!cliente) {
        const error = new Error('Cliente no encontrado');
        return res.status(404).json({msg: error.message});
    }

    return res.json(cliente)

}