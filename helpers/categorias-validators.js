const Categoria = require('../models/categoria');
const Libro = require('../models/libro');

const elNombreExiste = async (nombre) => {

    nombre = nombre.toUpperCase();
    const existeNombre = await Categoria.findOne({ nombre });
    if (existeNombre) {
        throw new Error(`ese nombre de categoria ya existe`);
    }
}

const existeCategoriaPorId = async (id, res) => {

    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        return res.status(413).json({
            mensaje: "no existe la categoria indicada"
        });
    } else {
        return existeCategoria;
    }
}

const existeLibroAsociado = async (id) => {

    const existeAsociado = await Libro.findOne({ categoria_id: id });
    if (existeAsociado) {
        throw new Error(`categoria con libros asociados, no se puede eliminar`);
    }
}

module.exports = {
    elNombreExiste,
    existeCategoriaPorId,
    existeLibroAsociado
}