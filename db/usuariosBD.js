import User from "../models/usuarioModelo.js";
import { encriptarPassword, validarPassword } from "../middlewares/funcionesPassword.js";
import { mensajes } from "../libs/manejoErrores.js";
import { crearToken } from "../libs/jwt.js";

export async function register({ username, email, password }) {
    try {
        // Verificar si el usuario ya existe
        const usuarioExistente = await User.findOne({ username });
        if (usuarioExistente) {
            return mensajes(400, "Usuario ya existente");
        }

        // Verificar si el email ya está en uso
        const emailExistente = await User.findOne({ email });
        if (emailExistente) {
            return mensajes(400, "Email ya existente");
        }

        // Encriptar la contraseña
        const { hash, salt } = encriptarPassword(password);
        const nuevoUsuario = new User({ username, email, password: hash, salt });

        // Guardar el nuevo usuario en la base de datos
        const respuesta = await nuevoUsuario.save();
        const token = await crearToken({ id: respuesta._id });

        return mensajes(200, "Registro agregado ---- ", "", token);
    } catch (error) {
        return mensajes(400, error.message || "Error en el registro");
    }
}

export const login = async ({ username, password }) => {
    try {
        // Buscar el usuario por nombre de usuario
        const usuarioCorrecto = await User.findOne({ username });
        if (!usuarioCorrecto) {
            return mensajes(400, "Datos incorrectos");
        }

        // Validar la contraseña
        const passwordCorrecto = validarPassword(password, usuarioCorrecto.salt, usuarioCorrecto.password);
        if (!passwordCorrecto) {
            return mensajes(400, "Datos incorrectos");
        }

        // Si las credenciales son correctas, se puede generar un token o realizar otras acciones
        const token = await crearToken({ id: usuarioCorrecto._id });
        return mensajes(200, "Acceso Permitido", "", token);
    } catch (error) {
        return mensajes(400, "Datos incorrectos");
    }
}