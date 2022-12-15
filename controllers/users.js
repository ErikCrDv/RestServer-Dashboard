const { request, response } = require('express');
const bcrypt = require('bcryptjs');

// Model
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');


//Controllers
const getUsers = async ( req = request, res = response ) => {
    const users = await User.find({}, 'name email ');
    res.json({ uid: req.uid, users });
}

const setUser = async ( req = request, res = response ) => {
    
    const { name, email, password } =  req.body;
    try {
        // Validacion de Correo 
        const emailExist = await User.findOne({ email });
        if( emailExist ) {
            return res.status(400).json({ 
                msg: 'El correo ya existe' 
            });
        }

        // User to DB
        const user = new User( req.body );
        // Encryp
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
        // Insert User
        await user.save();
        // Generar JWT
        const token = await generateJWT( user.id );

        //
        res.json({ user, token });
        
    } catch (error) {
        console.log( error );res.status(500).json({
            msg: 'Error Inesperado... Revisar logs'
        });
    }

}

// TODO validar token y comprobar si es el usuario correcto
const updateUser = async ( req = request, res = response ) => {
    const uid = req.params.id;

    try {
        // User Exists ?
        const user = await User.findById( uid );
        if( !user ){
            return res.status(400).json({
                msg: 'No existe un usuario con el uid ingresado'
            });
        }

        // Update User
        const {password, google, email, ...fields} = req.body; 
        // data
        if( user.email !== email ){
            const emailExist = await User.findOne({ email });
            if( emailExist ){
                return res.status(400).json({
                    msg: 'Esta dirección de correo electrónico ya está siendo usada'
                });
            }
        }
        fields.email = email;
        const userUpdated = await User.findByIdAndUpdate( uid, fields, { new: true } );

        res.json( userUpdated );

    } catch (error) {
        console.log( error );res.status(500).json({
            msg: 'Error Inesperado... Revisar logs'
        });
    }
}

const deleteUser = async ( req = request, res = response ) => {

    const uid = req.params.id;
    try {
        // User Exists ?
        const user = await User.findById( uid );
        if( !user ){
            return res.status(400).json({
                msg: 'No existe un usuario con el uid ingresado'
            });
        }

        await User.findByIdAndDelete( uid );
        res.json({ msg: 'Usuario Eliminado' })
        
    } catch (error) {
        console.log( error );res.status(500).json({
            msg: 'Error Inesperado... Revisar logs'
        });
    }
}


module.exports = {
    getUsers,
    setUser,
    updateUser,
    deleteUser
}