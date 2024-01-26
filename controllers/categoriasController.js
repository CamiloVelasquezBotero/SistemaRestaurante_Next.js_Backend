import mongoose from 'mongoose';
import Categoria from '../models/Categoria.js';

export const agregarCategoria = async (req, res) => {
   const { nombre } = req.body;

   const existeCategoria = await Categoria.findOne({nombre});

   if(existeCategoria) {
    const error = new Error('Ya existe esta categoria');
    return res.status(404).json({msg: error.message})
   } 

   try {
    const categoria = new Categoria(req.body);
    categoria.save();
    return res.json(categoria);
   } catch (error) {
    console.error(`Error al crear la categoria: ${error}`);
   }
}

export const obtenerCategorias = async (req, res) => {
   const categorias = await Categoria.find({}).select('-__v');
   return res.json(categorias)
}

export const obtenerCategoria = async (req, res) => {
   const { id } = req.params
   
   try {
      const categoria = await Categoria.findById(id).select('-__v');
      return res.json(categoria);
   } catch (error) {
      return console.error('Categoria no encontrada: ', error);
   } 
}

export const editarCategoria = async (req, res) => {
   const { id } = req.params;
   const { nombre } = req.body;
   
   // Buscar categoria
   let categoria
   try {
      categoria = await Categoria.findById(id)
   } catch (error) {
      console.error(`Error al encontrar Categoria para editar: ${error}`)
   }

   // Comprobar Existencia
   const existeCategoria = await Categoria.findOne({nombre});
   if(existeCategoria) {
      const error = new Error('Ya exsite una categoria con este nombre')
      return res.status(404).json({msg: error.message})
   }

   // Guardar Categoria
   try {
      categoria.nombre = nombre;
      await categoria.save();
      return res.json({msg: 'Categoria editada correctamente'})
   } catch (error) {
      console.error(`Error al editar la categoria: ${error}`)
   }
}

export const eliminarCategoria = async (req, res) => {
   const { id } = req.params;
   
   try {
      const categoriaEliminar = await Categoria.findById(id);
      await categoriaEliminar.deleteOne();
      return res.json({msg: 'Categoria eliminada correctamente'})
   } catch (error) {
      return res.status(400).json({msg: 'Error al eliminar Categoria o Categoria no encontrada'})
   }
}