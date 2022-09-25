
const registrar = (req, res, next) => {
    res.send('Veterinarios');
}

const perfil = (req, res, next) => {
    res.send('Perfil');
}

export {
    registrar,
    perfil
}