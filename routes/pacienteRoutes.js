import express from 'express';
import { obtenerPacientes, agregarPaciente } from '../controllers/pacienteController.js'
import authHandler from '../middlewares/authMiddleware.js';

const router = express.Router();

// Private Router
router.route("/")
    .get(authHandler, obtenerPacientes)
    .post(authHandler, agregarPaciente)

export default router;