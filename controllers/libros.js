const { response, request } = require('express');
const { existeCategoriaPorId } = require('../helpers/categorias-validators');
const { libroYaExiste, libroYaPrestado, existeLibroPorId, libroNoPrestado } = require('../helpers/libros-validators');
const { existePersonaPorId } = require('../helpers/personas-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const Libro = require('../models/libro');


const librosGet = async (req = request, res = response) => {

    try {
        const libros = await Libro.find();

        // if (libros.length === 0) {
        //     res.status(413).json({
        //         libros
        //     });
        // }

        res.status(200).json({
            libros
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error inesperado"
        })
    }

}

const libroGetPorId = async (req = request, res = response) => {

    const { id } = req.params;

    // if (!id) {
    //     return res.status(413).json({
    //         mensaje: "el id del libro es obligatorio"
    //     });
    // }

    try {

        const libroOk = existeLibroPorId(id);

        if (libroOk) {
            const libro = await Libro.findById(id);

            res.json({
                libro
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error inesperado"
        })
    }
}

const libroPost = async (req, res = response) => {

    let { nombre, descripcion, categoria_id, persona_id } = req.body;
    nombre = nombre.toUpperCase();

    const libro = new Libro({ nombre, descripcion, categoria_id, persona_id });

    try {
        // Guardar en BD
        await libro.save();

        res.json({
            libro
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error inesperado"
        })
    }

}

const libroPut = async (req, res = response) => {

    const { id } = req.params;
    const { descripcion } = req.body;

    try {

        let libro = await Libro.findByIdAndUpdate(id, { descripcion });
        libro = await Libro.findById(id);
        res.json({
            libro
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error inesperado"
        })
    }

}


const libroPrestarPut = async (req, res = response) => {

    const { id } = req.params;
    const persona_id = req.body.persona_id;

    const libroOk = existeLibroPorId(id);
    const libroPrestadoOk = libroYaPrestado(id);
    const personaOk = existePersonaPorId(persona_id);
    // Si queremos quitar el helper de personas reemplazar existePersonaPorId por:
    // const personaOk = await Persona.findById(id);
    // if (!personaOk) {
    //     return res.status(413).json({
    //         mensaje: "no existe la persona indicada"
    //     });
    // }

    if (libroOk && libroPrestadoOk && personaOk) {
        try {
            await Libro.findByIdAndUpdate(id, { persona_id });

            res.json({
                mensaje: "Se presto correctamente"
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error inesperado"
            })
        }
    }
}


const libroDevolverPut = async (req, res = response) => {

    const { id } = req.params;

    const libroOk = existeLibroPorId(id);
    const libroPrestadoOk = libroNoPrestado(id);

    try {

        await Libro.findByIdAndUpdate(id, { persona_id: null });

        res.json({
            mensaje: "Se realizo la devolucion correctamente"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error inesperado"
        })
    }
}

const libroDelete = async (req, res = response) => {

    const { id } = req.params;

    const libroOk = existeLibroPorId(id);
    const libroPrestadoOk = libroYaPrestadoParaBorrar(id);

    try {
        // Fisicamente lo borramos
        await Libro.findByIdAndDelete(id);

        res.json({
            mensaje: "Se borro correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error inesperado"
        })
    }
}

module.exports = {
    librosGet,
    libroGetPorId,
    libroPost,
    libroDelete,
    libroPut,
    libroPrestarPut,
    libroDevolverPut
}