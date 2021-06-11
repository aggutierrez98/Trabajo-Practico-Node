const Libro = require('../models/libro');

const existeLibroPorId = async(id) => {

    const existeLibro = await Libro.findById(id);
    if (!existeLibro) {
        throw new Error(`No existe libro con id ${id}`);
    }
}

const elNombreLibroExiste = async(nombre) => {

    nombre = nombre.toUpperCase();
    const existeLibro = await Libro.findOne({ nombre });
    if (existeLibro) {
        throw new Error(`El libro: ${ nombre }, ya está registrado`);
    }
}

const libroYaPrestado = async(id) => {

    const libro = await Libro.findById(id);
    if (libro.persona_id !== null) {
        throw new Error(`Libro prestado a la persona con este id ${libro.persona_id}`);
    }
}

module.exports = {
    existeLibroPorId,
    elNombreLibroExiste,
    libroYaPrestado
}