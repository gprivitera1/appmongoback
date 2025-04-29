const Reserva = require('../models/ReservaModel');
const Producto = require('../models/ProductoModel');
const Cliente = require('../models/ClienteModel');
const Equipamiento = require('../models/EquipamientoModel');
const moment = require('moment');


const { calcularDescuento, verificarCancelacion } = require('../services/ReservaService');

exports.createReserva = async (req, res) => {
    try {
        const { clienteId, productoId, fechaHora, turno } = req.body;

        // Verificar si el cliente y el producto existen
        const cliente = await Cliente.findById(clienteId);
        const producto = await Producto.findById(productoId).populate('equipamiento');
        if (!cliente || !producto) {
         
            return res.status(404).json({ message: 'Cliente o producto no encontrado' });
        }

        // Verificar si el turno está disponible
        const turnoDisponible = await verificarTurnoDisponible(productoId, fechaHora, turno);
        if (!turnoDisponible) {
            return res.status(400).json({ message: 'El turno no está disponible' });
        }
   
        // Verificar si el cliente ya tiene 3 turnos reservados
        const reservasCliente = await Reserva.find({ cliente: clienteId, estado: 'Reservado' });
        if (reservasCliente.length >= 3) {
            return res.status(400).json({ message: 'El cliente ya tiene 3 turnos reservados' });
        }

        // Verificar disponibilidad de equipamiento
        const equipamiento = await Equipamiento.findById(producto.equipamiento);
        if (producto.tipo === 'JetSky' || producto.tipo === 'Cuatriciclo') {
            if (equipamiento.casco < 1 || equipamiento.chaleco < 1) {
                return res.status(400).json({ message: 'No hay equipamiento disponible' });
            }
        }

        const anticipacionMaxima = moment().add(48, 'hours');
        if (moment(fechaHora).isAfter(anticipacionMaxima)) {
            return res.status(400).json({ message: 'La reserva debe hacerse con una anticipación no mayor a 48 horas' });
        }

        // Crear la reserva
        const reserva = new Reserva({
            clienteId: clienteId,
            productoId: productoId,
            fechaHora,
            turno,
            equipamiento: producto.equipamiento,
        });

        await reserva.save();
        cliente.reservas.push(reserva._id);
        await cliente.save();

        // Calcular descuento si aplica
        const total = calcularDescuento(reserva);
        res.status(201).json({ reserva, total });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const verificarTurnoDisponible = async (productoId, fechaHora, turno) => {
    const reservas = await Reserva.find({
        producto: productoId,
        fechaHora: {
            $gte: moment(fechaHora).startOf('minute').toDate(),
            $lt: moment(fechaHora).endOf('minute').toDate(),
        },
        turno: turno,
        estado: 'Reservado',
    });

    return reservas.length === 0; // Si no hay reservas, el turno está disponible
};

exports.cancelarReserva = async (req, res) => {
    const { reservaId } = req.params;
    try {
        const reserva = await Reserva.findById(reservaId);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        const puedeCancelar = verificarCancelacion(reserva.fechaHora);
        if (!puedeCancelar) {
            return res.status(400).json({ message: 'No se puede cancelar la reserva' });
        }

        reserva.estado = 'Cancelado';
        await reserva.save();
        res.status(200).json({ message: 'Reserva cancelada' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getReservaById = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await Reserva.findById(id).populate('cliente producto'); // Asegúrate de incluir las referencias necesarias
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

