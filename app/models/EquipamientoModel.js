const mongoose = require('mongoose');

const equipamientoSchema = new mongoose.Schema({
    casco: { type: Number, default: 0 }, // Cantidad de cascos disponibles
    chaleco: { type: Number, default: 0 } // Cantidad de chalecos disponibles
});

const Equipamiento = mongoose.model('Equipamiento', equipamientoSchema);
module.exports = Equipamiento;
