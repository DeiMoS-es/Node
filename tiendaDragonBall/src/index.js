require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('api', require('./routes/api'));
// Conectamos a la base de datos
const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});