/**
 *  Route: /api/doctor
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { getDoctors, setDoctor, updateDoctor, deleteDoctor } = require("../controllers/doctor");
const { validateJWT } = require('../helpers/validate-jwt');
const { validateFlieds } = require("../middlewares/validate-fields");


const router = Router();

router.get('/', [validateJWT], getDoctors);

router.post('/', [
    validateJWT,
    check('name', 'Nombre es obligatorio').not().isEmpty(),
    check('hospital', 'Hospital es obligatorio').not().isEmpty(),
    check('hospital', 'No es un Id Valido').isMongoId(),
    validateFlieds
], setDoctor);

router.put('/:id', [
    validateJWT,
    check('name', 'Nombre es obligatorio').not().isEmpty(),
    check('hospital', 'Hospital es obligatorio').not().isEmpty(),
    check('hospital', 'No es un Id Valido').isMongoId(),
    validateFlieds
], updateDoctor);

router.delete('/:id', [ validateJWT ], deleteDoctor);

module.exports = router;