const { response } = require("express");
const jwt = require('jsonwebtoken');

const validateJWT = ( req, res = response, next ) => {
    // Leer el Token
    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET_KEY);
        req.uid = uid
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
}

module.exports = {
    validateJWT
}