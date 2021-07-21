const { Router } = require('express');

// const { existeLibroPorId, elNombreLibroExiste, libroYaPrestado } = require('../helpers/libros-validators');
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

const { validarCamposGetPorId, validarCamposPost, validarCamposPut, validarCamposPrestar, validarCamposDevolver, validarCamposBorrar } = require('../middlewares/libros-validators');

const router = Router();


router.get('/', librosGet);

router.get('/:id', [
    validarCamposGetPorId
], libroGetPorId);

router.post('/', [
    validarCamposPost
], libroPost);

router.put('/:id', [
    validarCamposPut
], libroPut);

router.put('/prestar/:id', [
    validarCamposPrestar
], libroPrestarPut);

router.put('/devolver/:id', [
    validarCamposDevolver
], libroDevolverPut);

router.delete('/:id', [
    validarCamposBorrar
], libroDelete);

module.exports = router;