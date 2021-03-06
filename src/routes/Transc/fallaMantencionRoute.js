//dependences
const fallamantencionRoute = require("express").Router();
const { check, validationResult } = require('express-validator');

//Controllers
const {  listFallaMatencion, creatingfallaMantencion,updateFallaMantencion,deleteFallaMantencion } = require("../../controllers/Transc/fallaMatencion.controller");


//Routes Controllers
fallamantencionRoute.post('/', [
    check('Id_mantencion', 'La id de la matención es Obligatoria').isInt(),
    check('Id_falla', 'La id de la falla es obligatoria').isInt(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
    creatingfallaMantencion(req, res);
});

fallamantencionRoute.get('/', listFallaMatencion);

fallamantencionRoute.put('/:Id_FallaMantencion', [
    check('Id_mantencion', 'La id de la matención es Obligatoria').isInt(),
    check('Id_falla', 'La id de la falla es obligatoria').isInt(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
    updateFallaMantencion(req, res);
});

fallamantencionRoute.delete('/:Id_FallaMantencion', deleteFallaMantencion)

module.exports = fallamantencionRoute;