const path = require('path');
const fs = require('fs');

const { response, request } = require("express");
const { v4: uuidv4 } = require( 'uuid' );
const { updateImg } = require("../helpers/update-img");

const uploadImg = async ( req = request, res = response ) => {
    const { collection, id } = req.params;

    // Validar Collection
    const validCollections = ['users', 'doctors', 'hospitals'];
    if( !validCollections.includes( collection) ){
        return res.status(400).json({
            msg: 'La coleccion ingresada no es valida'
        });
    }

    // Validar archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // Procesar Img
    const file = req.files.img;
    const shortName = file.name.split('.');
    const extensionFile = shortName[ shortName.length - 1 ];

    //Validar Extension
    const validExtension = ['png', 'jpg', 'jpeg', 'gif'];
    if( !validExtension.includes( extensionFile ) ){
        return res.status(400).json({
            msg: 'Extension de la imagen invalida'
        })
    }

    // Nombre de la imagen
    const newFileName = `${ uuidv4() }.${ extensionFile }`;

    //Path
    const filePath = `./uploads/${ collection }/${ newFileName }`;

    // Save
    file.mv(filePath, (err) => {
        if (err) {
            return res.status(500).json({
                msg: 'Error al guardar la imagen'
            });
        }

        // Insert/Update Database
        updateImg( collection, id, newFileName );
    
        res.json({
            msg: 'File uploaded!',
            newFileName
        });

    });

}

const getImg = async (req = request, res = response) => {
    const { collection, img } = req.params;

    const pathImg = path.join( __dirname, `../uploads/${ collection }/${ img }` );
    
    //Imagen Default 
    if( fs.existsSync( pathImg ) ){
        res.sendFile( pathImg );
    }else{
        const pathImgDef = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( pathImgDef );
    }
    
}

module.exports = {
    uploadImg,
    getImg
}