// services/pagoService.js
const Reserva = require('../models/ReservaModel');
const { calcularDescuento, verificarCancelacion } = require('../services/ReservaService');

exports.procesarPago = async (reserva, monto) => {
    // Calcular el total de la reserva
    const totalReserva = await calcularTotalReserva(reserva);
    
    // Verificar si el monto coincide con el total
    if (monto !== totalReserva) {
        return null; // El monto no coincide
    }  

    return totalReserva; // Retornar el total si coincide
};

const calcularTotalReserva = async (reserva) => {

    const total = await calcularDescuento(reserva);
    return total;
};