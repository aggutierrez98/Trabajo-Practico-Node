const { response, request } = require('express');
const Categoria = require('../models/categoria');


const categoriasGet = async(req = request, res = response) => {

    try {
        const categorias = await Categoria.find();

        if (categorias.length === 0) {
            res.status(413).json({
                categorias
            });
        }

        res.status(200).json({
            categorias
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error inesperado"
        })
    }

}

const categoriaGetPorId = async(req = request, res = response) => {

    const { id } = req.params;

    try {
        const categoria = await Categoria.findById(id);
        res.json({
            categoria
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error inesperado"
        })
    }
}

const categoriaPost = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoria = new Categoria({ nombre });

    try {
        // Guardar en BD
        await categoria.save();

        res.json({
            categoria
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error inesperado"
        })
    }
}

const categoriaDelete = async(req, res = response) => {

    const { id } = req.params;

    try {
        // Fisicamente lo borramos
        const categoria = await Categoria.findByIdAndDelete(id);

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
    categoriasGet,
    categoriaPost,
    categoriaDelete,
    categoriaGetPorId
}