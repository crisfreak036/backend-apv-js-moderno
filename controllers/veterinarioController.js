import Veterinario from '../models/Veterinario.js';
import generarJWT from '../helpers/generarJWT.js';
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";

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
        return res.status(400).json({ code: 400, error: true, message: "El Usuario Ya Existe", data: undefined });
    }

    try {
        // Crea al usuario
        const veterinario = new Veterinario(body);
        const veterinarioGuardado = await veterinario.save();

        // Enviar Correo con el código único
        emailRegistro({
            email,
            nombre, 
            token: veterinario.token
        })

        res.status(201).json({ code: 201, error: false, message: "Veterinario Creado Correctamente", data: undefined });
    } catch (error) {
       console.log(error);
       res.status(422).json({ code: 422, error: true, message: "Something wrong",data: undefined });
    }
}

const perfil = (req, res, next) => {
    res.json({message:'Mostrando Perfil', user: req.user});
}

const confirmar = async (req, res, next) => {
    const { token } = req.params;

    try {
        // Se busca al usuario por su token
        const usuario = await Veterinario.findOne({token: token});
        if (!usuario) {
            return res.status(404).json({ code: 404, error: true, message: "Error en la Confirmación",data: undefined });
        }

        usuario.token = null; // Se cambia el valor del token a null 
        usuario.confirmado = true; // Se cambiar a true el atributo confirmado
        await usuario.save(); // Se guardan los cambios

        res.status(200).json({code: 200, error: false, message: 'Usuario confirmado correctamente', data: {id: usuario._id}});
    } catch (error) {
        console.log(error);
        res.status(422).json({ code: 422, error: true, message: "Something wrong",data: undefined });
    }

}

const autenticar = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Comprobar la existencia de un Usuario
        const usuario = await Veterinario.findOne({email: email});
        if (!usuario) {
            console.log('El usuario no existe');
            return res.status(403).json({ code: 403, error: true, message: "Not Authorized",data: undefined });
        }

        // Se comprueba que sea un usuario confirmado
        if (!usuario.confirmado) {
            console.log('Usuario sin confirmar');
            return res.status(403).json({ code: 403, error: true, message: "Not Authorized",data: undefined });
        }

        // Se comprueba que la password sea la correcta
        const contraseñaEsCorrecta = await usuario.comprobarPassword(password);
        if (!contraseñaEsCorrecta) {
            console.log('Contraseña Incorrecta');
            return res.status(403).json({ code: 403, error: true, message: "Not Authorized",data: undefined });
        }

        // Autenticar
        const jwt = generarJWT({sub: usuario._id});
        res.status(200).json({code: 200, error: false, message: 'Usuario autenticado correctamente', data: {jwt: jwt}});
        
    } catch (error) {
        console.log(error);
        res.status(422).json({ code: 422, error: true, message: "Something wrong",data: undefined });
    }
}

const olvidePassword = async (req, res, next) => {
    const { body } = req;

    // Comprueba que el body tenga información (se puede utilizar JOI para validar elementos de la req)
    if (Object.keys(body).length === 0) {
        return res.status(400).json({ code: 400, error: true, data: undefined });
    }

    const { email } = body;

    try {
        const usuario = await Veterinario.findOne({email: email});
        if (!usuario) {
            return res.status(404).json({ code: 404, error: true, message: "Not Found", data: undefined });
        }

        if (!usuario.confirmado) {
            return res.status(400).json({ code: 400, error: true, message: "Confirmation is required", data: undefined });
        }

        usuario.token = generarId();
        await usuario.save();

        res.status(200).json({code: 200, error: false, message: 'Correo de recuperación enviado', data: undefined});
    } catch (error) {
        console.log(error);
        res.status(422).json({ code: 422, error: true, message: "Something wrong",data: undefined });
    }
    
}

const comprobarToken = async (req, res, next) => {
    const { token } = req.params;

    try {
        // Se busca al usuario por su token
        const usuario = await Veterinario.findOne({token: token});
        if (!usuario) {
            return res.status(404).json({ code: 404, error: true, message: "Invalid Token",data: undefined });
        }

        res.status(200).json({code: 200, error: false, message: 'Puede cambiar la contraseña', data: undefined});
    } catch (error) {
        console.log(error);
        res.status(422).json({ code: 422, error: true, message: "Something wrong",data: undefined });
    }

}

const nuevoPassword = async (req, res, next) => {

    const { token } = req.params;
    const bodyKeys = Object.keys(req.body);
    if (!bodyKeys.includes('password') || bodyKeys.length > 1) return res.status(400).json({ code: 400, error: true, data: undefined });

    const { password } = req.body;

    try {
        const usuario = await Veterinario.findOne({token: token});
        if (!usuario) {
            return res.status(404).json({ code: 404, error: true, message: "Invalid Token",data: undefined });
        }

        usuario.token = null;
        usuario.password = password;
        await usuario.save();


        res.status(200).json({code: 200, error: false, message: 'Contraseña  Cambiada', data: undefined});
    } catch (error) {
        console.log(error);
        res.status(422).json({ code: 422, error: true, message: "Something wrong",data: undefined });
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}