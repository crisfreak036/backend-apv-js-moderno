import mongoose from "mongoose";
import bcrypt from "bcrypt";

import generarId from "../helpers/generarId.js";

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarId(),
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

veterinarioSchema.pre('save', async function (next) {
    // Evita que una contraseña ya codificada no sea codificada nuevamente
    if(!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10); // genera el salt de codificación
    this.password = await bcrypt.hash(this.password, salt); // codifica la contraseña
});

veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
    // Compara el password ingresado con el hash que se encuentra en la base de datos
    return await bcrypt.compare(passwordFormulario, this.password);
}

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);

export default Veterinario;