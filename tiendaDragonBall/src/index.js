import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import apiroutes from './routes/api.js';
import connectDB from './config/db.js';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

// Conectamos a la base de datos
connectDB();

//Delegamos las rutas que vengan de /api a nuestro archivo de rutas
app.use('/api', apiroutes);

app.get('/', (req, res) => {
  res.json({ message: 'API Working' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});