// controllers/EquipamientoController.js
const EquipamientoService = require('../services/EquipamientoService');

exports.createEquipamiento = async (req, res) => {
    try {
        const equipamientoData = req.body; // Obtener los datos del cuerpo de la solicitud
        const nuevoEquipamiento = await EquipamientoService.createEquipamiento(equipamientoData);
        res.status(201).json({ message: 'Equipamiento creado exitosamente', equipamiento: nuevoEquipamiento });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};