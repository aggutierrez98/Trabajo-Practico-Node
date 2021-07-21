const { Router } = require('express');

// const { check } = require('express-validator');
// const { validarCampos } = require('../middlewares/validar-campos');
// const { existePersonaPorId, elEmailExiste, existeLibroAsociado } = require('../helpers/personas-validators');

const {
    personaDelete,
    personaGetPorId,
    personasGet,
    personaPost,
    personaPut
} = require('../controllers/personas');

const { 
    validarPersonaGetId, 
    validarPersonaPost, 
    validarPersonaPut, 
    validarPersonaDelete } = require('../middlewares/personas-validators');


const router = Router();


//TODO responder a todo con faltan datos
//TODO cambiar a validaciones propias no de express-validator

router.get('/', personasGet);

router.get('/:id', [
    validarPersonaGetId
], personaGetPorId);

router.post('/', [
    validarPersonaPost
], personaPost);

router.put('/:id', [
    validarPersonaPut
], personaPut);

router.delete('/:id', [
    validarPersonaDelete
],personaDelete);

module.exports = router;