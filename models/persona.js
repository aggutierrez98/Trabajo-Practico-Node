const { Schema, model } = require('mongoose');

const PersonaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    alias: {
        type: String,
        required: [true, 'El alias es obligatorio'],
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    }
});

PersonaSchema.methods.toJSON = function() {
    const { __v, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Persona', PersonaSchema);