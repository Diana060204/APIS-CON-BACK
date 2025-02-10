import mongoose from "mongoose";

// Definición del esquema para el modelo de usuario
const usuariosSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3, // Se puede agregar una longitud mínima para mayor seguridad
        maxlength: 30 // Se puede agregar una longitud máxima para limitar el tamaño
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true, // Convertir a minúsculas para evitar duplicados
        match: [/.+@.+\..+/, "Por favor ingresa un email válido"] // Validación básica de email
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Se puede agregar una longitud mínima para mayor seguridad
    },
    salt: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true // Agrega campos de createdAt y updatedAt
});

// Exportar el modelo de usuario
export default mongoose.model('User ', usuariosSchema);