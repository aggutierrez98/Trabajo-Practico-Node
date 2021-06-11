const Persona = require('../models/persona');
const Libro = require('../models/libro');

const existePersonaPorId = async(id = null) => {

    if (id !== null) {
        const existePersona = await Persona.findById(id);
        if (!existePersona) {
            throw new Error(`No existe persona con id ${id}`);
        }
    }
}

const elEmailExiste = async(email) => {

    const existeEmail = await Persona.findOne({ email });
    if (existeEmail) {
        throw new Error(`El email: ${ email }, ya está registrado`);
    }
}

const existeLibroAsociado = async(id) => {

    const existeAsociado = await Libro.findOne({ persona_id: id });
    if (existeAsociado) {
        throw new Error(`Persona no se puede borrar esta asociada al libro: ${existeAsociado.nombre}`);
    }
}

module.exports = {
    existePersonaPorId,
    elEmailExiste,
    existeLibroAsociado
}