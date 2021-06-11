const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { elNombreExiste, existeCategoriaPorId, existeLibroAsociado } = require('../helpers/categorias-validators');

const {
    categoriasGet,
    categoriaPost,
    categoriaDelete,
    categoriaGetPorId
} = require('../controllers/categoria');


const router = Router();

router.get('/', categoriasGet);
router.get('/:id', [
    check('id', 'No es un ID mongo válido').isMongoId(),
    validarCampos,
    check("id").custom(existeCategoriaPorId),
    validarCampos
], categoriaGetPorId);

router.post('/', [
    check('nombre', 'Faltan datos: El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(elNombreExiste),
    validarCampos
], categoriaPost);

router.delete('/:id', [
    check('id', 'No es un ID mongo válido').isMongoId(),
    validarCampos,
    check("id").custom(existeCategoriaPorId),
    check("id").custom(existeLibroAsociado),
    validarCampos
], categoriaDelete);

module.exports = router;