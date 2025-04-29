// routes/EquipamientoRoutes.js
const express = require('express');
const router = express.Router();
const EquipamientoController = require('../controllers/EquipamientoController');

router.post('/', EquipamientoController.createEquipamiento);

module.exports = router;