// routes/MonedaRoutes.js
const express = require('express');
const router = express.Router();
const MonedaController = require('../controllers/MonedaController');

router.post('/', MonedaController.createMoneda);

module.exports = router;