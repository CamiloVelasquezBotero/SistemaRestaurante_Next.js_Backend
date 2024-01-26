import Pedido from "../models/Pedido.js";
import Cliente from "../models/Cliente.js";

export const agregarPedido = async (req, res) => {
    const { telefono, productos, totalPagado, tipoDePedido }  = req.body;
    const creador = req.usuario._id;
    let existeCliente;

    const datosPedido = {
        productos: productos,
        totalPagado,
        creador, 
        tipoDePedido
    }

    const pedido = new Pedido(datosPedido);

    // Verificar el telefono, para ver si ya esta agregado el cliente o no
    if(telefono) {
        existeCliente = await Cliente.findOne({telefono})
        if(existeCliente) {
            pedido.cliente = existeCliente._id
        } else {
            // Si no existe se le agrega a las notas adicionales del pedido
            pedido.notasAdicionales = `Telefono Cliente: ${telefono}`;
        }
    } 

    // Guardar pedido
    try {
        const pedidoGuardado = await pedido.save();
        //Guardar en los pedidos del cliente
        if(existeCliente) {
            existeCliente.pedidos.push(pedidoGuardado)
            existeCliente.save();
        }
        return res.json(pedidoGuardado);
    } catch (error) {
        console.error('Error al guardar el pedido: ', error);
    }

}

export const obtenerPedido = async (req, res) => {
    const { numeroPedido } = req.params;
    const existePedido = await Pedido.findOne({numeroPedido});

    if(!existePedido) {
        const error = new Error('Pedido no enconstrado');
        return res.status(404).json({msg: error.message});
    }

    return res.json(existePedido);
}

export const obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find({});
        return res.json(pedidos);
    } catch (error) {
        console.error(`Error al obtener los pedidos: ${error}`);
    }
}

export const eliminarPedido = async (req, res) => {
    // Comprobamos que el usuario sea admin para poder borrar un pedido...
    if(!req.usuario.admin) {
        return res.status(403).json({msg: 'No tienes permisos para hacer esta solicitud'})
    } 

    const { pedidoID } = req.params;
    
    try {
        const existePedido = await Pedido.findById(pedidoID);
    
        if(!existePedido) {
            const error = new Error('Pedido no enconstrado');
            return res.status(404).json({msg: error.message});
        }
        await existePedido.deleteOne();
        return res.json({msg: `Pedido Eliminado correctamente`})
    } catch (error) {
        console.error(`Error al eliminar pedido: ${error}`);
    }
}