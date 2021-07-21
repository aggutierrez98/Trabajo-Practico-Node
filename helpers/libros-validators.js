const Persona = require('../models/persona');
const Libro = require('../models/libro');

const existePersonaPorId = async (id, res) => {

    const existePersona = await Persona.findById(id);
    if (!existePersona) {
        return res.status(413).json({
            mensaje: "no existe la persona indicada"
        });
    } else {
        return existePersona;
    }

}

const elEmailExiste = async (email) => {

    const existeEmail = await Persona.findOne({ email });
    if (existeEmail) {
        throw new Error(`el email ya se encuentra registrado`);
    }
}

const existeLibroAsociado = async (id) => {

    const existeAsociado = await Libro.findOne({ persona_id: id });
    if (existeAsociado) {
        throw new Error(`esa persona tiene libros asociados, no se puede eliminar`);
    }
}

module.exports = {
    existePersonaPorId,
    elEmailExiste,
    existeLibroAsociado
}