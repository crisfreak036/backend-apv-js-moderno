import Paciente from '../models/Paciente.js';

const obtenerPacientes = async (req, res, next) => {
    const { user } = req;

    try {
        // Busca los pacientes relacionado al veterinario que consulta el endpoint
        const pacientes = await Paciente.find({veterinario: user._id});

        if (pacientes.length === 0)  return res.status(404).json({ code: 404, error: true, message: "Este Veterinario no tiene pacientes", data: undefined });

        res.status(200).json({ code: 200, error: false, message: "ok", data: pacientes });
    } catch (error) {
        console.log(error);
        res.status(422).json({ code: 422, error: true, message: "Something wrong",data: undefined });
    }
}

const agregarPaciente = async (req, res, next) => {
    const { user, body } = req;

    // Comprueba que el body tenga información (se puede utilizar JOI para validar elementos de la req)
    if (Object.keys(body).length === 0) {
        return res.status(400).json({ code: 400, error: true, data: undefined });
    }

    const { nombre, propietario, email, sintomas } = body;

    if ([nombre, propietario, email, sintomas].includes(undefined)) return res.status(400).json({ code: 400, error: true, data: undefined });

    try {
        // Crea al usuario
        const paciente = new Paciente({nombre, propietario, email, sintomas, veterinario: user._id});
        const pacienteGuardado = await paciente.save();
        res.status(201).json({ code: 201, error: false, message: "ok", data: pacienteGuardado });
    } catch (error) {
       console.log(error);
       res.status(422).json({ code: 422, error: true, message: "Something wrong",data: undefined });
    }
}

export {
    obtenerPacientes,
    agregarPaciente
}