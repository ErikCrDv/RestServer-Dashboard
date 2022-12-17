/**
 *  Route: /api/users
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleLogin, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../helpers/validate-jwt');
const { validateFlieds } = require('../middlewares/validate-fields');

const router = Router();


router.post('/login', [
    check('email', 'Email obligatorio').isEmail(),
    check('password', 'Password obligatorio').not().isEmpty(),
    validateFlieds
], login )

router.post('/login/google', [
    check('token', 'Token obligatorio').not().isEmpty(),
    validateFlieds
], googleLogin )

router.get('/login/renew', [
    validateJWT
], renewToken )


module.exports = router;