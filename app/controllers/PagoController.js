// controllers/pagoController.js
const Pago = require('../models/PagoModel');
const Reserva = require('../models/ReservaModel');
const { procesarPago } = require('../services/PagoService');
const moment = require('moment');

exports.createPago = async (req, res) => {
    try {
        const { reservaId, monto, monedaId } = req.body;

        // Verificar si la reserva existe
        const reserva = await Reserva.findById(reservaId);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        // Verificar si el pago se realiza 2 horas antes del turno
        const dosHorasAntes = moment(reserva.fechaHora).subtract(2, 'hours');
        if (moment().isAfter(dosHorasAntes)) {
            return res.status(400).json({ message: 'El pago debe realizarse al menos 2 horas antes del turno' });
        }

        // Procesar el pago
        const total = await procesarPago(reserva, monto);
        if (total === null) {
            return res.status(400).json({ message: 'El monto no coincide con el total de la reserva' });
        }

        // Crear el registro de pago
        const pago = new Pago({
            reservaId: reservaId,
            monto: total,
            monedaId: monedaId,
        });

        await pago.save();

        // Actualizar el estado de la reserva
        reserva.pagado = true;
        await reserva.save();

        res.status(201).json({ message: 'Pago realizado con éxito', pago });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};