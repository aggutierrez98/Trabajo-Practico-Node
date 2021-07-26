const Libro = require('../models/libro');
//const Persona = require('../models/persona');
const Categoria = require('../models/categoria');

const ObjectId = require('mongoose').Types.ObjectId;

const validarCamposGetPorId = async (req, res, next) => {

    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(413).json({
            mensaje: "categoria no encontrada"
        })
    }


    const existeCategoria = await Categoria.findById(id)

    if (!existeCategoria) {
        return res.status(413).json({
            mensaje: "categoria no encontrada"
        })
    }

    next();
}

const validarCamposBorrar = async (req, res, next) => {

    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(413).json({
            mensaje: "categoria no encontrada"
        })
    }

    const existeCategoria = await Categoria.findById(id)

    if (!existeCategoria) {
        return res.status(413).json({
            mensaje: "categoria no encontrada"
        })
    }


    const libro = await Libro.findOne({ categoria_id: id })

    if (libro) {
        return res.status(413).json({
            mensaje: "categoria con libros asociados, no se puede eliminar"
        })
    }

    next();
}

const validarCamposPost = async (req, res, next) => {

    let nombre = req.body.nombre;

    if (!nombre) {
        return res.status(413).json({
            mensaje: "faltan datos"
        });
    }

    nombreCategoria = nombre.toUpperCase();

    const existeNombreCategoria = await Categoria.findOne({ nombre: nombreCategoria });

    if (existeNombreCategoria) {
        return res.status(413).json({
            mensaje: "ese nombre de categoria ya existe"
        });
    }

    next();
}

module.exports = {
    validarCamposGetPorId,
    validarCamposBorrar,
    validarCamposPost
}