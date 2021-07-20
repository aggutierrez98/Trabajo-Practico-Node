const { Schema, model } = require('mongoose');

const LibroSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        unique: false,
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

LibroSchema.methods.toJSON = function () {
    const { __v, persona_id, ...libro } = this.toObject();
    libro.persona_id = persona_id;
    return libro;
}

module.exports = model('Libro', LibroSchema);