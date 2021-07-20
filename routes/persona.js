const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { existePersonaPorId, elEmailExiste, existeLibroAsociado } = require('../helpers/personas-validators');

const {
    personaDelete,
    personaGetPorId,
    personasGet,
    personaPost,
    personaPut
} = require('../controllers/personas');

const router = Router();


//TODO responder a todo con faltan datos
//TODO cambiar a validaciones propias no de express-validator

router.get('/', personasGet);

router.get('/:id', [
    check('id', 'No es un ID mongo válido').isMongoId(),
    check("id").custom(existePersonaPorId),
    validarCampos
], personaGetPorId);

router.post('/', [
    check('nombre', 'Faltan datos: El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'Faltan datos: El apellido es obligatorio').not().isEmpty(),
    check('alias', 'Faltan datos: El alias es obligatorio').not().isEmpty(),
    check('email', 'Faltan datos: El email es obligatorio').not().isEmpty(),
    check('email', 'El mail enviado no es valido').isEmail(),
    check("email").custom(elEmailExiste),
    validarCampos
], personaPost);


router.put('/:id', [
    check('id', 'No es un ID mongo válido').isMongoId(),
    check("id").custom(existePersonaPorId),
    check("email").custom(elEmailExiste),
    validarCampos
], personaPut);


router.delete('/:id', [
    check('id', 'No es un ID mongo válido').isMongoId(),
    check("id").custom(existePersonaPorId),
    check("id").custom(existeLibroAsociado),
    validarCampos
], personaDelete);

module.exports = router;