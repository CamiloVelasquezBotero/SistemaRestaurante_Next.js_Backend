import mongoose from 'mongoose';

const categoriaSchema = mongoose.Schema({
    nombre: {
        type: String,
        unique: true
    }
}, { timestamps: false });

const Categoria = mongoose.model('Categoria', categoriaSchema);

export default Categoria;

