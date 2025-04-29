const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    tipo: { type: String, enum: ['JetSky', 'Cuatriciclo', 'Equipo de buceo', 'Tabla de surf'], required: true },
    precioPorTurno: { type: Number, required: true },
    maximoPersonas: { type: Number, default: 2 },
    equipamiento: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipamiento', required: true } 
});

const Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto;