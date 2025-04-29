// controllers/MonedaController.js
const MonedaService = require('../services/MonedaService');

exports.createMoneda = async (req, res) => {
    try {
        const monedaData = req.body; // Obtener los datos del cuerpo de la solicitud
        const nuevaMoneda = await MonedaService.createMoneda(monedaData);
        res.status(201).json({ message: 'Moneda creada exitosamente', moneda: nuevaMoneda });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};