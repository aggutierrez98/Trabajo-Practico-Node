const Categoria = require('../models/categoria');
const Libro = require('../models/libro');

const elNombreExiste = async(nombre) => {

    nombre = nombre.toUpperCase();
    const existeNombre = await Categoria.findOne({ nombre });
    if (existeNombre) {
        throw new Error(`El nombre: ${ nombre }, ya está registrado`);
    }
}

const existeCategoriaPorId = async(id) => {

    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`No existe categoria con id ${id}`);
    }
}

const existeLibroAsociado = async(id) => {

    const existeAsociado = await Libro.findOne({ categoria_id: id });
    if (existeAsociado) {
        throw new Error(`Categoria no se puede borrar esta asociada al libro: ${existeAsociado.nombre}`);
    }
}

module.exports = {
    elNombreExiste,
    existeCategoriaPorId,
    existeLibroAsociado
}