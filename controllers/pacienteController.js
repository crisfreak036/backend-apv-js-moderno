import Paciente from '../models/Paciente.js';

const obtenerPacientes = async (req, res, next) => {
    const { user } = req;

    try {
        // Busca los pacientes relacionado al veterinario que consulta el endpoint
        const pacientes = await Paciente.find().where('veterinario').equals(user);

        if (pacientes.length === 0)  return res.status(404).json({ code: 404, error: true, message: "Este Veterinario no tiene pacientes", data: [] });

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

const obtenerPaciente = async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;
    try {
        const paciente = await Paciente.findById(id);
        console.log(paciente);
        if (!paciente)  return res.status(404).json({ code: 404, error: true, message: "Paciente no encontrado", data: {} });
        if (paciente.veterinario._id.toString() !== user._id.toString()) return res.status(403).json({ code: 403, error: true, message: "Acción no valida", data: {} });
        res.status(200).json({ code: 200, error: false, message: "ok", data: paciente });
    } catch (error) {
        console.log(error);
        res.status(422).json({ code: 422, error: true, message: "Something wrong",data: undefined });
    }
}

const actualizarPaciente = async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    if (Object.keys(body).length === 0) {
        return res.status(400).json({ code: 400, error: true, data: undefined });
    }

    try {
        let paciente = await Paciente.findById(id);
        if (!paciente)  return res.status(404).json({ code: 404, error: true, message: "Paciente no encontrado", data: {} });

        const newData = {...paciente, ...body};
        paciente = {...newData};
        // await paciente.save();

        res.status(200).json({ code: 200, error: false, message: "ok", data: newData });
    } catch (error) {
        console.log(error);
        res.status(422).json({ code: 422, error: true, message: "Something wrong",data: undefined });
    }
}

const eliminarPaciente = async (req, res, next) => {
    const { id } = req.params;

    try {
        const paciente = await Paciente.findById(id);

        if (!paciente)  return res.status(404).json({ code: 404, error: true, message: "Paciente no encontrado", data: {} });

        // await paciente.delete();

        res.status(200).json({ code: 200, error: false, message: "ok", data: paciente });
    } catch (error) {
        console.log(error);
        res.status(422).json({ code: 422, error: true, message: "Something wrong",data: undefined });
    }
}


export {
    obtenerPacientes,
    obtenerPaciente,
    agregarPaciente,
    actualizarPaciente, 
    eliminarPaciente
}