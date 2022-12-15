const { response } = require("express");
const bcrypt = require('bcryptjs');

//Model
const Users = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const login = async ( req, res = response ) => {
    const { email, password } = req.body;

    try {

        // Verificar Email
        const userDB  = await Users.findOne({ email });
        if( !userDB ){
            return res.status(404).json({
                msg: 'Email/password NO VALIDO'
            });
        }
        // Verificar Password
        const validPassword = bcrypt.compareSync( password, userDB.password );
        if( !validPassword ){
            return res.status(404).json({
                msg: 'email/Password NO VALIDO'
            });
        }

        // Generar JWT
        const token = await generateJWT( userDB.id );
 
        res.json({ token });
    } catch (error) {
        res.status(500).json({
            msg: 'Error inesperado, comunicarse con el administrador'
        });
    }
}

module.exports = {
    login
}