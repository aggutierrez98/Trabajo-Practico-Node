const { Schema, model } = require('mongoose');

const LibroSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String
    },
    categoria_id: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: true
    },
    persona_id: {
        type: Schema.Types.ObjectId,
        ref: "Persona",
        default: null
    }
});

LibroSchema.methods.toJSON = function() {
    const { __v, ...libro } = this.toObject();
    return libro;
}

module.exports = model('Libro', LibroSchema);