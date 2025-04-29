const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/ClienteController');

router.post('/', clienteController.createCliente);
router.put('/:id', clienteController.updateCliente);
router.get('/:id', clienteController.getCliente);
router.get('/', clienteController.getClientes);

module.exports = router;