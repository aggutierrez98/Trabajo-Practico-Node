const Libro = require('../models/libro');


const existeLibroPorId = async (id, res) => {

    const existeLibro = await Libro.findById(id)

    if (!existeLibro) {
        console.log("no existe hay error")
        return res.status(413).json({
            mensaje: "no se encuentra ese libro"
        })
    } else {
        return true;
    }
}

const libroYaExiste = async (nombre, res) => {

    nombre = nombre.toUpperCase();
    const existeNombre = await Libro.findOne({ nombre });

    if (existeNombre) {
        return res.status(413).json({
            mensaje: "ese libro ya existe"
        });
    } else {
        return true;
    }
}

const libroYaPrestado = async (id, res) => {

    const libro = await Libro.findById(id);

    if (libro.persona_id !== null) {
        return res.status(413).json({
            mensaje: "el libro ya se encuentra prestado, no se puede prestar hasta que no se devuelva"
        });
    } else {
        return true;
    }
};

const libroNoPrestado = async (id, res) => {

    const libro = await Libro.findById(id);

    if (libro.persona_id === null) {
        return res.status(413).json({
            mensaje: "ese libro no estaba prestado"
        });
    } else {
        return true;
    }
};

const libroYaPrestadoParaBorrar = async (id, res) => {

    const libro = await Libro.findById(id);

    if (libro.persona_id !== null) {
        return res.status(413).json({
            mensaje: "ese libro esta prestado no se puede borrar"
        });
    } else {
        return true;
    }
};


module.exports = {
    existeLibroPorId,
    libroYaExiste,
    libroYaPrestado,
    libroNoPrestado,
    libroYaPrestadoParaBorrar
}