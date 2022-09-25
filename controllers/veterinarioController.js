
const registrar = (req, res, next) => {
    res.json({message:'Registrando Usuario...'});
}

const perfil = (req, res, next) => {
    res.json({message:'Mostrando Perfil'});
}

export {
    registrar,
    perfil
}