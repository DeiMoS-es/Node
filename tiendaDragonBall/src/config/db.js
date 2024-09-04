import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });
        console.log('Database connected');
        return connection;
    } catch (error) {
        console.log('Error connecting to the database: ', error);
        process.exit(1); // Detener la aplicación si no se puede conectar a la base de datos
    }
};

export default connectDB;