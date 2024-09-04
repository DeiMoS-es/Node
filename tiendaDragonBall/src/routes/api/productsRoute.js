import express from 'express';
import { sendMessage, getProducts, getHeroe, createProduct, updateProduct, options } from '../../modules/productos/controllers/productsController.js';

const router = express.Router();

// Ruta para manejar los productos
router.get('/', sendMessage);
router.get('/all', getProducts);
router.get('/:id', getHeroe);
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.options('/:id', options);

export default router;