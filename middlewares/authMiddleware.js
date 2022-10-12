import jwt from 'jsonwebtoken';

import Veterinario from '../models/Veterinario.js';

const authHandler = async (req, res, next) => {
    let token;
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) res.status(403).json({ code: 403, error: true, message: "Not Authorized",data: undefined });
    
    try {
        token = req.headers.authorization.split(" ")[1];
        const payloadDecifrado = jwt.decode(token, process.env.JWT_SECRET);
        const veterinario = await Veterinario.findById(payloadDecifrado.sub).select("-password -token -confirmado");

        if (!veterinario) {
            res.status(403).json({ code: 403, error: true, message: "Not Authorized",data: undefined });
        }

        req.user = veterinario;
        next();

    } catch (error) {
        console.log(error);
        res.status(403).json({ code: 403, error: true, message: "Not Authorized",data: undefined });
    }
}

export default authHandler;