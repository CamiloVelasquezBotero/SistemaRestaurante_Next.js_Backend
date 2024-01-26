import mongoose from 'mongoose';

const productoSchema = mongoose.Schema({
    nombre: {
        type: String,
        unique: true
    },
    precio: {
        type: Number,
        trim: true
    },
    categoria: {
        type: String,
        ref: 'Categoria',
        required: true
    }
}, { timestamps: false })

const Producto = mongoose.model('Producto', productoSchema);

export default Producto;