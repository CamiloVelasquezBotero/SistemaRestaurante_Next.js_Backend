import Producto from "../models/Producto.js";
import Categoria from "../models/Categoria.js";

export const agregarProducto = async (req, res) => {
    const { nombre } = req.body;
    const existeProducto = await Producto.findOne({nombre});

    if(existeProducto) {
        const error = new Error('Este producto ya existe');
        return res.status(409).json({msg: error.message});
    }
    
    try {
        const producto = new Producto(req.body);
        const productoGuardado = await producto.save();
        return res.json(productoGuardado)
    } catch (error) {
        console.error(`Error al crear el producto: ${error}`);
    }
}

export const obtenerProductos = async (req, res) => {
    const productos = await Producto.find({}).select('-__v');
    return res.json(productos)
}

export const editarProducto = async (req, res) => {
    const { productoId } = req.params;
    const { categoria } = req.body;

    let producto;

    try {
        producto = await Producto.findById(productoId);
    } catch (error) {
        console.error(`Error al encontrar el producto por id: ${error}`);
    }
    // Si no existe...
    if(!producto) {
        const error = new Error('Producto no encontrado');
        return res.status(404).json({msg: error.message});
    }

    // Existe Categoria?
    const existeCategoria = await Categoria.findOne({nombre: categoria})
    if(!existeCategoria) {
        const error = new Error('Categoria no encontrado');
        return res.status(404).json({msg: error.message});
    }

    try {
        // Actualiar los nuevos datos
        producto.nombre = req.body.nombre || producto.nombre;
        producto.categoria = req.body.categoria || producto.categoria;
        producto.precio = req.body.precio || producto.precio;

        // Guardar y enviar como respuesta el producto actualizado...
        const productoActualizado = await producto.save();
        return res.json({msg: 'Producto editado correctamente'});
    } catch (error) {
        console.error(`Error al actualizar el producto: ${error}`);
    }
}

export const eliminarProducto = async (req, res) => {
    const { productoId } = req.params;

    let producto; 

    try {
        producto = await Producto.findById(productoId);
    } catch (error) {
        console.error(`Error al encontrar el producto por id: ${error}`);
    }
    // Si no existe...
    if(!producto) {
        const error = new Error('Producto no encontrado');
        return res.status(404).json({msg: error.message});
    }

    try {
        await producto.deleteOne();
        return res.json({msg: 'Producto eliminado correctamente'})
    } catch (error) {
        console.error(`Error al eliminar el producto: ${error}`);
    }
}