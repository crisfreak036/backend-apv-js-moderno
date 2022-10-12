import express from 'express';
import { registrar, perfil, confirmar, autenticar } from '../controllers/veterinarioController.js'
import authHandler from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public Router
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);

// Private Router
router.get("/perfil", authHandler, perfil);

export default router;