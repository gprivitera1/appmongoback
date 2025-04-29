const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String },
    reservas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reserva' }]
});

const Cliente = mongoose.model('Cliente', clienteSchema);


module.exports = Cliente;