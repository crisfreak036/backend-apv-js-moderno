import express from 'express';
import dotenv from 'dotenv'
import connectDB from "./config/db.js"

let port = process.env.PORT || 4005;

const app = express(); // Almacena toda la funcionalidad del servidor
dotenv.config();

connectDB();

app.use("/", (req, res) => {
    res.send("Hola Mundo");
});

app.listen(port, () => {
    console.log('Servidor funcionando en http://localhost:4005');
}) // El servidor queda escuchando las peticiones que llegan al puerto indicado