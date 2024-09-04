require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

// Conectamos a la base de datos
const connectDB = require('./config/db');
connectDB();
//Delegamos las rutas que vengan de /api a nuestro archivo de rutas
app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
  res.json({ message: 'API Working' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});