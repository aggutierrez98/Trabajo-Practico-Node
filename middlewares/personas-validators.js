const Libro = require('../models/libro');
const Persona = require('../models/persona');

const ObjectId = require('mongoose').Types.ObjectId;

const validarPersonaGetId = async (req, res, next) => {

    const { id } = req.params;

    //Que sea id de mongo
    if (!ObjectId.isValid(id)) {
        return res.status(413).json({
            mensaje: "no se encuentra esa persona"
        })
    }

    const existePersona = await Persona.findById(id)

    if (!existePersona) {
        return res.status(413).json({
            mensaje: "no se encuentra esa persona"
        })
    }

    next();
}

const validarPersonaPost = async (req, res, next) => {

    let { nombre, apellido, alias, email } = req.body;

    // Validar datos
    if (!nombre || !apellido || !alias || !email) {
        return res.status(413).json({
            mensaje: "faltan datos"
        })
    }

    // Validar mail como error inesperado
    let resto = email.split('@')
    if (resto.length < 2) {

        return res.status(413).json({
            mensaje: "faltan datos"
        });

    } else {
        let dotCom = resto[1].substr(-4)
        if (dotCom !== '.com') {
            return res.status(413).json({
                mensaje: "faltan datos"
            });
        }
    }

    // Persona ya registrada
    const existePersona = await Persona.findOne({ email });

    if (existePersona) {
        return res.status(413).json({
            mensaje: "el email ya se encuentra registrado"
        });
    }

    next();
}

const validarPersonaPut = async (req, res, next) => {

    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(413).json({
            mensaje: "no se encuentra esa persona"
        })
    };

    const existePersona = await Persona.findById(id)

    if (!existePersona) {
        return res.status(413).json({
            mensaje: "no se encuentra esa persona"
        })
    }

    next();
}

const validarPersonaDelete = async (req, res, next) => {

    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(413).json({
            mensaje: "no se encuentra esa persona"
        })
    }

    const persona = await Persona.findById(id)

    if (!persona) {
        return res.status(413).json({
            mensaje: "no se encuentra esa persona"
        })
    }
    const libro = await Libro.find({ persona_id: id })

    if (libro.length > 0) {
        return res.status(413).json({
            mensaje: "esa persona tiene libros asociados, no se puede eliminar"
        });
    }

    next();
}

module.exports = {
    validarPersonaGetId,
    validarPersonaPost,
    validarPersonaPut,
    validarPersonaDelete
}