import mongoose from 'mongoose';

const clienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true
    },
    pedidos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pedido'
        }
    ]
}, {
    timestamps: true
})

const Cliente = mongoose.model('Cliente', clienteSchema);
export default Cliente;