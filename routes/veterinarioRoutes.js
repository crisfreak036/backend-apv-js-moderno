import express from 'express';
import { registrar, perfil, actualizarPerfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword } from '../controllers/veterinarioController.js'
import authHandler from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public Router
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/olvide-password", olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

// Private Router
router.get("/perfil", authHandler, perfil);
router.patch("/perfil/:id", authHandler, actualizarPerfil);

export default router;