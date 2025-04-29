// controllers/clienteController.js
const Cliente = require('../models/ClienteModel');
const Reserva = require('../models/ReservaModel');

exports.createCliente = async (req, res) => {
    try {
        const { nombre, email, telefono } = req.body;
        const cliente = new Cliente({ nombre, email, telefono });
        await cliente.save();
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, telefono } = req.body;
        const cliente = await Cliente.findByIdAndUpdate(id, { nombre, email, telefono }, { new: true });
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findById(id).populate('reservas');
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find().populate('reservas');
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};