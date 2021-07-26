const { Router } = require('express');

const { validarCamposGetPorId, validarCamposBorrar, validarCamposPost } = require('../middlewares/categoria-validators');

const {
    categoriasGet,
    categoriaPost,
    categoriaDelete,
    categoriaGetPorId
} = require('../controllers/categoria');


const router = Router();

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