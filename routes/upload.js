/**
 *  Route: /api/upload
 */
const { Router } = require('express');
const fileUpload = require('express-fileupload');

const { uploadImg, getImg } = require('../controllers/upload');
const { validateJWT } = require('../helpers/validate-jwt');


const router = Router();
router.use(fileUpload());
router.put('/:collection/:id', [ validateJWT ], uploadImg );
router.get('/:collection/:img', [ validateJWT ], getImg );

module.exports = router;