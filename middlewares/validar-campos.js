const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {

    let errors = validationResult(req);
    if (!errors.isEmpty()) {

        error = errors.errors[0].msg;

        return res.status(413).json({
            mensaje: error
        });
    }

    next();
}

module.exports = {
    validarCampos
}