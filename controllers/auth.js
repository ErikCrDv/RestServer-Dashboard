const { response } = require("express");
const bcrypt = require('bcryptjs');

const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

//Model
const Users = require("../models/user");

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

const googleLogin = async ( req, res = response ) => {
    const { token } = req.body;

    try {
        const { name, email, picture } = await googleVerify( token );
        const userDb = await Users.findOne({ email });

        let user;
        if( !userDb ){
            user = new Users({
                name, 
                email, 
                password: '~~~', 
                img: picture,
                google: true
            })
        }else{
            user = userDb;
            user.google = true;
        }
        // SAVE
        await user.save();
        // Generar JWT
        const JWtoken = await generateJWT( user.id );
        res.json({ JWtoken });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error inesperado, TOKEN DE GOOGLE NO VALIDO, comunicarse con el administrador'
        });
    }

}

module.exports = {
    login,
    googleLogin
}