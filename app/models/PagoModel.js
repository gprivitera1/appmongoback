const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
    reservaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reserva', required: true },
    monto: { type: Number, required: true },
    monedaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Moneda', required: true }, 
    fechaPago: { type: Date, default: Date.now }
});

const Pago = mongoose.model('Pago', pagoSchema);
module.exports = Pago;
