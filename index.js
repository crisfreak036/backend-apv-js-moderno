import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";

import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'

let port = process.env.PORT || 4005;

const app = express(); // Almacena toda la funcionalidad del servidor

app.use(express.json()); // Se da a entender que el envío de datos será mediante JSON

dotenv.config();

connectDB();

app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);


app.listen(port, () => {
    console.log('Servidor funcionando en http://localhost:4005');
}) // El servidor queda escuchando las peticiones que llegan al puerto indicado