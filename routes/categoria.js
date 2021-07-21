const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { elNombreExiste, existeCategoriaPorId, existeLibroAsociado } = require('../helpers/categorias-validators');
const {validarCamposGetPorId, validarCamposBorrar, validarCamposPost} = require('../middlewares/categoria-validators'); 

const {
    categoriasGet,
    categoriaPost,
    categoriaDelete,
    categoriaGetPorId
} = require('../controllers/categoria');


const router = Router();

//TODO responder a todo con faltan datos
//TODO cambiar a validaciones propias no de express-validator

router.get('/', categoriasGet);

router.get('/:id', [
    validarCamposGetPorId
], categoriaGetPorId);

router.post('/', [
    validarCamposPost
], categoriaPost);

router.delete('/:id', [
    validarCamposBorrar
], categoriaDelete);

module.exports = router;