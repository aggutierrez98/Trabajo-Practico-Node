const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeLibroPorId, elNombreLibroExiste, libroYaPrestado } = require('../helpers/libros-validators');
const { existeCategoriaPorId } = require('../helpers/categorias-validators');
const { existePersonaPorId } = require('../helpers/personas-validators');

const {
    libroDelete,
    libroGetPorId,
    librosGet,
    libroPost,
    libroPut,
    libroPrestarPut,
    libroDevolverPut
} = require('../controllers/libros');

const router = Router();

router.get('/', librosGet);

router.get('/:id', [
    check('id', 'No es un ID mongo válido').isMongoId(),
    validarCampos,
    check("id").custom(existeLibroPorId),
    validarCampos
], libroGetPorId);

router.post('/', [
    check('nombre', 'Faltan datos: El nombre es obligatorio').not().isEmpty(),
    check('categoria_id', 'Faltan datos: El id de la categoria es obligatorio').not().isEmpty(),
    check('nombre').custom(elNombreLibroExiste),
    check("categoria_id").custom(existeCategoriaPorId),
    check("persona_id").custom(existePersonaPorId),
    validarCampos
], libroPost);


router.put('/:id', [
    check('id', 'No es un ID mongo válido').isMongoId(),
    check("id").custom(existeLibroPorId),
    validarCampos
], libroPut);

router.put('/prestar/:id', [
    check('id', 'No es un ID mongo válido').isMongoId(),
    check("id").custom(existeLibroPorId),
    check("id").custom(libroYaPrestado),
    check('persona_id', 'Faltan datos: el id de la persona a prestar es obligatorio').not().isEmpty(),
    check("persona_id").custom(existePersonaPorId),
    validarCampos
], libroPrestarPut);

router.put('/devolver/:id', [
    check('id', 'No es un ID mongo válido').isMongoId(),
    check("id").custom(existeLibroPorId),
    check("id", "El libro no esta prestado").not().custom(libroYaPrestado),
    validarCampos
], libroDevolverPut);


router.delete('/:id', [
    check('id', 'No es un ID mongo válido').isMongoId(),
    check("id").custom(existeLibroPorId),
    check("id").custom(libroYaPrestado),
    validarCampos
], libroDelete);

module.exports = router;