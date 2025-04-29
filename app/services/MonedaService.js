// services/MonedaService.js
const Moneda = require('../models/MonedaModel');

exports.createMoneda = async (data) => {
    try {
        const moneda = new Moneda(data);
        await moneda.save();
        return moneda;
    } catch (error) {
        throw new Error(error.message);
    }
};