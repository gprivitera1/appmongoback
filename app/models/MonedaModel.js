const mongoose = require('mongoose');

const monedaSchema = new mongoose.Schema({
    tipo: { type: String, enum: ['dólares', 'euros', 'bitcoin'], required: true },
    valor: { type: Number, required: true }
});

const Moneda = mongoose.model('Moneda', monedaSchema);
module.exports = Moneda;