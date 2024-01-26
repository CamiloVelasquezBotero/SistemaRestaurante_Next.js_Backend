import mongoose from 'mongoose';

const pedidoSchema = mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    productos: [
        {
            nombre: String,
            cantidad: Number,
            subtotal: Number
        }
    ],
    totalPagado: {
        type: Number,
        required: true
    },
    tipoDePedido: {
        type: String
    },
    notasAdicionales: {
        type: String
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now()
    }
}, { timestamps: false});

let ultimoNumeroPedido = 0;

pedidoSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.numeroPedido = ultimoNumeroPedido + 1;
        ultimoNumeroPedido = this.numeroPedido;
    }
    next();
});


const Pedido = mongoose.model('Pedido', pedidoSchema);
export default Pedido;