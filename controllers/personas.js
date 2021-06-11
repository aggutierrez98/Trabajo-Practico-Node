const { response, request } = require('express');
const Persona = require('../models/persona');


const personasGet = async(req = request, res = response) => {

    try {
        const personas = await Persona.find();

        if (personas.length === 0) {
            res.status(413).json({
                personas
            });
        }

        res.status(200).json({
            personas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error inesperado"
        })
    }

}

const personaGetPorId = async(req = request, res = response) => {

    const { id } = req.params;

    try {
        const persona = await Persona.findById(id);
        res.json({
            persona
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error inesperado"
        })
    }
}

const personaPost = async(req, res = response) => {

    const { nombre, apellido, alias, email } = req.body;
    const persona = new Persona({ nombre, apellido, alias, email });

    try {
        // Guardar en BD
        await persona.save();

        res.json({
            persona
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error inesperado"
        })
    }
}

const personaPut = async(req, res = response) => {

    const { id } = req.params;
    const { nombre, apellido, alias, email } = req.body;
    const data = {
        nombre,
        apellido,
        alias
    }
    try {

        let persona = await Persona.findByIdAndUpdate(id, data);
        persona = await Persona.findById(id);
        res.json({
            persona
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error inesperado"
        })
    }
}

const personaDelete = async(req, res = response) => {

    const { id } = req.params;

    try {
        // Fisicamente lo borramos
        const persona = await Persona.findByIdAndDelete(id);

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
    personasGet,
    personaGetPorId,
    personaPost,
    personaDelete,
    personaPut
}