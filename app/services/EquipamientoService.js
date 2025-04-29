// services/EquipamientoService.js
const Equipamiento = require('../models/EquipamientoModel');

exports.createEquipamiento = async (data) => {
    try {
        const equipamiento = new Equipamiento(data);
        await equipamiento.save();
        return equipamiento;
    } catch (error) {
        throw new Error(error.message);
    }
};