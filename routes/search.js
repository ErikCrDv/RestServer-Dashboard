/**
 *  Route: /api/search
 */
const { Router } = require('express');
const { searchAll, searchByCollection } = require('../controllers/search');
const { validateJWT } = require('../helpers/validate-jwt');


const router = Router();


router.get('/:keyword', [ validateJWT ], searchAll );
router.get('/:collection/:keyword', [ validateJWT ], searchByCollection );


module.exports = router;