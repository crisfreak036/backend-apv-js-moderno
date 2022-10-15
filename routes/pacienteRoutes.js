import express from 'express';
import { obtenerPacientes, agregarPaciente, obtenerPaciente, actualizarPaciente, eliminarPaciente } from '../controllers/pacienteController.js'
import authHandler from '../middlewares/authMiddleware.js';

const router = express.Router();

// Private Router
router.route("/")
    .get(authHandler, obtenerPacientes)
    .post(authHandler, agregarPaciente)

router.route("/:id")
    .get(authHandler, obtenerPaciente)
    .patch(authHandler, actualizarPaciente)
    .delete(authHandler, eliminarPaciente)

export default router;