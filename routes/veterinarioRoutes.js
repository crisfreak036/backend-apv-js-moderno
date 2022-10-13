import express from 'express';
import { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword } from '../controllers/veterinarioController.js'
import authHandler from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public Router
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/olvide-password", olvidePassword);
router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", nuevoPassword);

// Private Router
router.get("/perfil", authHandler, perfil);

export default router;