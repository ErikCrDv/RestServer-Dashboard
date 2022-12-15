/**
 *  Route: /api/users
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFlieds } = require('../middlewares/validate-fields');

const router = Router();


router.post('/login', [
    check('email', 'Email obligatorio').isEmail(),
    check('password', 'Password obligatorio').not().isEmpty(),
    validateFlieds
], login )


module.exports = router;