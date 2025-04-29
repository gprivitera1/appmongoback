const Producto = require('../models/ProductoModel');

exports.createProducto = async (req, res) => {
    try {
        const { nombre, tipo, precioPorTurno, maximoPersonas, equipamiento } = req.body;
        const producto = new Producto({ nombre, tipo, precioPorTurno, maximoPersonas, equipamiento });
        await producto.save();
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, tipo, precioPorTurno, maximoPersonas, equipamiento } = req.body;
        const producto = await Producto.findByIdAndUpdate(id, { nombre, tipo, precioPorTurno, maximoPersonas, equipamiento }, { new: true });
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id).populate('equipamiento');
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductos = async (req, res) => {
    try {
        const productos = await Producto.find().populate('equipamiento');
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};