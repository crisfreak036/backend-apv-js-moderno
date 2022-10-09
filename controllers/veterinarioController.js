import Veterinario from '../models/Veterinario.js'

const registrar = async (req, res, next) => {
    const { body } = req;

    // Comprueba que el body tenga información (se puede utilizar JOI para validar elementos de la req)
    if (Object.keys(body).length === 0) {
        return res.status(400).json({ code: 400, error: true, data: undefined });
    }

    const { email, password, nombre } = body;

    // Comprueba que el usuario exista previamente
    const usuario = await Veterinario.findOne({email: email});
    if (usuario) {
        return res.status(400).json({ code: 400, error: true, message: "user already exists", data: undefined });
    }


    try {
        // Crea al usuario
        const veterinario = new Veterinario(body);
        const veterinarioGuardado = await veterinario.save();
        res.status(201).json({ code: 201, error: false, message: "ok",data: veterinarioGuardado });
    } catch (error) {
       console.log(error);
       res.status(422).json({ code: 422, error: true, message: "Something wrong",data: undefined });
    }
}

const perfil = (req, res, next) => {
    res.json({message:'Mostrando Perfil'});
}

export {
    registrar,
    perfil
}