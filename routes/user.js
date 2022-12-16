/**
 *  Route: /api/users
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, setUser, updateUser, deleteUser } = require('../controllers/users');
const { validateJWT } = require('../helpers/validate-jwt');
const { validateFlieds } = require('../middlewares/validate-fields');

//
const router = Router();


//Routes
router.get('/', validateJWT, getUsers);

router.post('/', [
    //Middlewares
    check('name', 'Nombre es obligatorio').not().isEmpty(),
    check('email', 'Email es obligatorio').isEmail(),
    check('password', 'Password es obligatorio').not().isEmpty(),
    validateFlieds,
], setUser);

router.put('/:id', [
    //Middlewares
    validateJWT,
    check('name', 'Nombre es obligatorio').not().isEmpty(),
    check('email', 'Email es obligatorio').isEmail(),
    check('role', 'Role es obligatorio').not().isEmpty(),
    validateFlieds,
], updateUser );

router.delete('/:id', validateJWT, deleteUser );

module.exports = router;