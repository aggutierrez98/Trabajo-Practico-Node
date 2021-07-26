const { Router } = require('express');

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
], personaDelete);

module.exports = router;