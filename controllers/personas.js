const { response, request } = require('express');
const Persona = require('../models/persona');
const Libro = require('../models/libro');

const personasGet = async(req = request, res = response) => {

    try {
        const personas = await Persona.find();

        if (personas.length === 0) {
            res.status(204).json({
                message:"No hay personas"
            });
        }

        res.status(200).json({
            personas
        });

    } catch (error) {
        console.log(error);
        res.status(413).json({
            message: "Error inesperado"
        })
    }

}

const personaGetPorId = async(req = request, res = response) => {

    const { id } = req.params;
    try {
        const persona = await Persona.findById(id);
        
        if(!persona) {
            res.status(413).json({
                message:"No se encuentra esa persona"
            });            
        } else {
            res.json({
                persona
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error inesperado"
        })
    }
}

const personaPost = async(req, res = response) => {
    
    const { nombre, apellido, alias, email } = req.body;
    
    // Validar datos recibidos
    if( !nombre || !apellido || !alias || !email ) {
        res.status(413).json({
            message:"faltan datos"
        });            
        return
    }
    
    // Validar email

    // Validar si el mail ya está siendo usado
    const personaRegistrada = await Persona.find({email});
    
    if( personaRegistrada.length != 0 ) {
        // throw new Error("El email ya se encuentra registrado")
        res.status(413).json({
            message:"El mail ya se encuentra registrado"
        })
        return;
    }

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

    if( !nombre || !apellido || !alias || !email ) {
        res.status(413).json({
            message:"faltan datos"
        });            
        return;
    }

    const data = {
        nombre,
        apellido,
        alias
    }

    // Validar ID ?
    
    try {

        let persona = await Persona.findByIdAndUpdate(id, data);

        // Validar si existe
        persona = await Persona.findById(id);

        if( persona ) {
            res.json({
                persona
            });
        } else {
            //throw new Error ('Persona no encontrada')
            res.status(413).json({
                message:"Persona no encontrada"
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error inesperado"
        })
    }
}

const personaDelete = async(req, res = response) => {

    const { id } = req.params;

    // Validar ID

    //Existe persona en la base de datos
    const existePersona = await Persona.findById(id);
    if (!existePersona) {
        // throw new Error(`No existe persona con id ${id}`);
        res.status(413).json({
            message:`No existe persona con id ${id}`
        })
    }

    //Existe persona con libros asociados
    const existeAsociado = await Libro.findOne({ persona_id: id });
    if (existeAsociado) {
        // throw new Error(`Persona no se puede borrar esta asociada al libro: ${existeAsociado.nombre}`);
        res.status(413).json({
            message: `No se puede borrar esta persona asociada al libro ${existeAsociado.nombre}`
        })
    }

    try {
        // Fisicamente lo borramos
        await Persona.findByIdAndDelete(id);

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