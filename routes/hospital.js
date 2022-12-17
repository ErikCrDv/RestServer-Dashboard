/**
 *  Route: /api/hospital
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { getHospitals, setHospital, updateHospital, deleteHospital } = require("../controllers/hospital");
const { validateJWT } = require('../helpers/validate-jwt');
const { validateFlieds } = require("../middlewares/validate-fields");


const router = Router();

router.get('/', [ validateJWT ], getHospitals);

router.post('/', [
    validateJWT,
    check('name', 'Nombre es obligatorio').not().isEmpty(),
    validateFlieds
], setHospital);

router.put('/:id', [
    validateJWT,
    check('name', 'Nombre es obligatorio').not().isEmpty(),
    validateFlieds
], updateHospital);

router.delete('/:id', [ validateJWT ], deleteHospital);

module.exports = router;