// src/routes/api.js
import express from 'express';
const router = express.Router();

import productsRoute from './api/productsRoute.js';
router.use('/items', productsRoute);

export default router;