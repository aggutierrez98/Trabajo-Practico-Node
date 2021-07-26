const Libro = require('../models/libro');
const Persona = require('../models/persona');
const Categoria = require('../models/categoria');

const ObjectId = require('mongoose').Types.ObjectId;

const validarCamposGetPorId = async (req, res, next) => {

    const { id } = req.params;

    //Que sea id valido de mongo
    if (!ObjectId.isValid(id)) {
        return res.status(413).json({
            mensaje: "no se encuentra ese libro"
        })
    }

    const existeLibro = await Libro.findById(id)

    if (!existeLibro) {
        return res.status(413).json({
            mensaje: "no se encuentra ese libro"
        })
    }

    next();
}

const validarCamposPost = async (req, res, next) => {

    let { nombre, descripcion, categoria_id, persona_id } = req.body;

    if (!nombre || !categoria_id) {
        return res.status(413).json({
            mensaje: "nombre y categoria son datos obligatorios"
        });
    }

    if (!ObjectId.isValid(categoria_id)) {
        return res.status(413).json({
            mensaje: "no existe categoria con ese id"
        })
    }

    if (persona_id) {
        if (!ObjectId.isValid(persona_id)) {
            return res.status(413).json({
                mensaje: "no existe persona con ese id"
            })
        }
    }

    nombre = nombre.toUpperCase();
    const existeNombre = await Libro.findOne({ nombre });

    if (existeNombre) {
        return res.status(413).json({
            mensaje: "ese libro ya existe"
        });
    }

    const existeCategoria = await Categoria.findById(categoria_id);

    if (!existeCategoria) {
        return res.status(413).json({
            mensaje: "no existe la categoria indicada"
        });
    }

    if (persona_id) {
        const existePersona = await Persona.findById(persona_id);

        if (!existePersona) {
            return res.status(413).json({
                mensaje: "no existe la persona indicada"
            });
        }
    }

    next();
}

const validarCamposPut = async (req, res, next) => {

    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(413).json({
            mensaje: "no se encuentra ese libro"
        })
    }

    const existeLibro = await Libro.findById(id)

    if (!existeLibro) {
        return res.status(413).json({
            mensaje: "no se encuentra ese libro"
        })
    }

    next();
}

const validarCamposPrestar = async (req, res, next) => {

    const { id } = req.params;
    const persona_id = req.body.persona_id;

    if (!ObjectId.isValid(id)) {
        return res.status(413).json({
            mensaje: "no se encuentra ese libro"
        })
    }

    if (!ObjectId.isValid(persona_id)) {
        return res.status(413).json({
            mensaje: "no existe la persona indicada"
        })
    }

    const libro = await Libro.findById(id)

    if (!libro) {
        return res.status(413).json({
            mensaje: "no se encuentra ese libro"
        })
    }

    if (libro.persona_id !== null) {
        return res.status(413).json({
            mensaje: "el libro ya se encuentra prestado, no se puede prestar hasta que no se devuelva"
        });
    }

    const existePersona = await Persona.findById(persona_id);

    if (!existePersona) {
        return res.status(413).json({
            mensaje: "no existe la persona indicada"
        });
    }

    next();
};

const validarCamposDevolver = async (req, res, next) => {

    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(413).json({
            mensaje: "no se encuentra ese libro"
        })
    }

    const libro = await Libro.findById(id)

    if (!libro) {
        return res.status(413).json({
            mensaje: "no se encuentra ese libro"
        })
    }

    if (libro.persona_id === null) {
        return res.status(413).json({
            mensaje: "ese libro no estaba prestado"
        });
    }

    next();
}

const validarCamposBorrar = async (req, res, next) => {

    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(413).json({
            mensaje: "no se encuentra ese libro"
        })
    }

    const libro = await Libro.findById(id)

    if (!libro) {
        return res.status(413).json({
            mensaje: "no se encuentra ese libro"
        })
    }

    if (libro.persona_id !== null) {
        return res.status(413).json({
            mensaje: "ese libro esta prestado no se puede borrar"
        });
    }

    next();
}

module.exports = {
    validarCamposGetPorId,
    validarCamposPost,
    validarCamposPut,
    validarCamposPrestar,
    validarCamposDevolver,
    validarCamposBorrar,
}