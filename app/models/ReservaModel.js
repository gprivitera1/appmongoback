const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    fechaHora: { type: Date, required: true },
    turno: { type: Number, required: true }, // 1, 2 o 3  // cada uno dura 30 minutos
    equipamiento: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipamiento', required: true }, // Referencia al equipamiento
    pagado: { type: Boolean, default: false },
    estado: { type: String, enum: ['Reservado', 'Cancelado', 'Completado', 'Disponible'], default: 'Disponible' },
    seguroTormenta: { type: Boolean, default: false }
});

const Reserva = mongoose.model('Reserva', reservaSchema);
module.exports = Reserva;
