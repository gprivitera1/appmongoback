// routes/reservaRoutes.js
const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/ReservaController');

router.post('/', reservaController.createReserva);
router.delete('/:reservaId', reservaController.cancelarReserva);
router.get('/:id', reservaController.getReservaById); // Ruta para obtener reserva por ID


module.exports = router;