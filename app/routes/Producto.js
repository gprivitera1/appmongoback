const express = require('express');
const router = express.Router();
const productoController = require('../controllers/ProductoController');

router.post('/', productoController.createProducto);
router.put('/:id', productoController.updateProducto);
router.get('/:id', productoController.getProducto);
router.get('/', productoController.getProductos);

module.exports = router;
