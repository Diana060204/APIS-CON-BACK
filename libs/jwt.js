import jwt from "jsonwebtoken";
import 'dotenv/config';
import { mensajes } from "./manejoErrores.js";

export function crearToken(dato) {
    return new Promise((resolve, reject) => {
        const opciones = {
            expiresIn: "1d"
        };

        jwt.sign(dato, process.env.SECRET_TOKEN, opciones, (err, token) => {
            if (err) {
                return reject(mensajes(400, "Error al generar el token"));
            }
            resolve(token);
        });
    });
}