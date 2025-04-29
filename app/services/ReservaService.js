// services/reservaService.js
const moment = require('moment');
const Producto = require('../models/ProductoModel');
const Reserva = require('../models/ReservaModel');
const Equipamiento = require('../models/EquipamientoModel');

exports.calcularDescuento = async (reserva) => {
    // Obtener el producto asociado a la reserva
    const producto = await Producto.findById(reserva.productoId);
    const precioPorTurno = producto.precioPorTurno;

    // Calcular el total sin descuento
    let total = precioPorTurno;

    // Si se alquilan más de un producto, aplicar descuento
    if (reserva.productos && reserva.productos.length > 1) {
        total *= 0.9; // 10% de descuento
    }

    // Si el producto es JetSky o Cuatriciclo, considerar el alquiler de equipamiento
    if (producto.tipo === 'JetSky' || producto.tipo === 'Cuatriciclo') {
        const equipamiento = await Equipamiento.findById(producto.equipamiento);
        total += equipamiento.casco * 10; // Suponiendo un costo por casco
        total += equipamiento.chaleco * 15; // Suponiendo un costo por chaleco

    }

    return total;
};

exports.verificarCancelacion = (fechaHora) => {
    const dosHorasAntes = moment(fechaHora).subtract(2, 'hours');
    return moment().isBefore(dosHorasAntes);
};