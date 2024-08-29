const express = require('express');
const router = express.Router();
const productController = require('../../modules/productos/controllers/productsController');

// Ruta para manejar los productos
router.get('/', productController.sendMessage);
router.get('/all', productController.getProducts);
router.get('/:id', productController.getHeroe);
router.post('/', productController.createProduct);

module.exports = router;