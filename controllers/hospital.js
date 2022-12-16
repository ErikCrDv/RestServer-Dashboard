const { request, response } = require("express");

//MODEL
const Hospital = require('../models/hospital');

//CONTROLLERS
const getHospitals = async ( req =request, res = response ) => {
    const hospitals = await Hospital.find()
                                    .populate('user', 'name img');
    res.json( hospitals );

}
const setHospital = async ( req =request, res = response ) => {
    const uid = req.uid;
    const hospital = new Hospital({
        user: uid, 
        ...req.body
    });

    try {
        // Validacion de Hospital 
        const hospitalExist = await Hospital.findOne({ name: hospital.name });
        if( hospitalExist ) {
            return res.status(400).json({ 
                msg: 'El Hospital ya existe' 
            });
        }

        const hospitalDB = await hospital.save();
        res.json( hospitalDB );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado, comuniquese con el administrador'
        })  
    }

}
const updateHospital = async ( req =request, res = response ) => {

    res.json({
        msg: 'updateHospital'
    });

}
const deleteHospital = async ( req =request, res = response ) => {

    res.json({
        msg: 'deleteHospital'
    });

}

module.exports = {
    getHospitals,
    setHospital,
    updateHospital,
    deleteHospital
}