import { Router } from "express";
import { register, login } from "../db/usuariosBD.js";
import User from "../models/usuarioModelo.js";
import { mensajes } from "../libs/manejoErrores.js";

const router = Router();

// Registro de usuarios
router.post("/registro", async (req, res) => {
    //console.log(req.body);
    
    const respuesta = await register(req.body);
    res.cookie('token', respuesta.token).status(respuesta.status).json(respuesta);
});

// Inicio de sesión
router.post("/login", async (req, res) => {
    const respuesta = await login(req.body);
    res.status(respuesta.status).json(respuesta);
});

// Ruta para salir
router.get("/salir", async (req, res) => {
    res.send("Estas en Salir");
});

// Ruta para mostrar todos los usuarios
router.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await User.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json(mensajes(500, "Error al obtener los usuarios", error));
    }
});

// Ruta para buscar un usuario por ID
router.get("/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await User.findById(id);

        if (!usuario) {
            return res.status(404).json(mensajes(404, "Usuario no encontrado"));
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json(mensajes(500, "Error al buscar el usuario", error));
    }
});

// Ruta para borrar un usuario por ID
router.delete("/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await User.findByIdAndDelete(id);

        if (!usuario) {
            return res.status(404).json(mensajes(404, "Usuario no encontrado"));
        }

        res.status(200).json(mensajes(200, "Usuario borrado correctamente"));
    } catch (error) {
        res.status(500).json(mensajes(500, "Error al borrar el usuario", error));
    }
});

// Ruta para actualizar un usuario por ID
router.put("/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const usuario = await User.findByIdAndUpdate(id, datosActualizados, {
            new: true,
            runValidators: true
        });

        if (!usuario) {
            return res.status(404).json(mensajes(404, "Usuario no encontrado"));
        }

        res.status(200).json(mensajes(200, "Usuario actualizado correctamente", usuario));
    } catch (error) {
        res.status(500).json(mensajes(500, "Error al actualizar el usuario", error));
    }
});

// Ruta para mostrar administradores (pendiente de implementación específica)
router.get("/administradores", async (req, res) => {
    res.send("Estas en Administradores");
});

// Ruta para mostrar usuarios casuales (pendiente de implementación específica)
router.get("/casuales", async (req, res) => {
    res.send("Estas en Casuales");
});

export default router;