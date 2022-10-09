import Veterinario from '../models/Veterinario.js'

const registrar = async (req, res, next) => {
    const { body } = req;
    if (Object.keys(body).length === 0) {
        return res.status(422).json({ code: 422, error: true, data: undefined });
    }
    try {
        const veterinario = new Veterinario(body);
        const veterinarioGuardado = await veterinario.save();
        res.status(201).json({ code: 201, error: false, data: veterinarioGuardado });
    } catch (error) {
       console.log(error);
       res.status(422).json({ code: 422, error: true, data: undefined });
    }
}

const perfil = (req, res, next) => {
    res.json({message:'Mostrando Perfil'});
}

export {
    registrar,
    perfil
}