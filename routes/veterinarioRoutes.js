import express from 'express';
import { registrar, perfil, confirmar, autenticar } from '../controllers/veterinarioController.js'

const router = express.Router();
router.get("/perfil", perfil);
router.get("/confirmar/:token", confirmar);

router.post("/", registrar);
router.post("/login", autenticar);

export default router;