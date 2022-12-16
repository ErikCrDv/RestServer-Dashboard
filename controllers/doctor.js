const { request, response } = require("express");

// Model
const Doctor = require('../models/doctor');

const getDoctors = async ( req =request, res = response ) => {
    const doctors = await Doctor.find()
                                .populate('user', 'name img')
                                .populate('hospital', 'name img');
    res.json( doctors );

}
const setDoctor = async ( req =request, res = response ) => {
    const uid = req.uid;
    const doctor = new Doctor({ 
        user: uid, 
        ...req.body
    });

    try {

        // Verificar Doctor
        const doctorExist = await Doctor.findOne( { name: doctor.name } );
        if( doctorExist ){
            return res.status(400).json({
                msg: 'El Doctor ya existe'
            });
        }
    
        const doctorDB = await doctor.save();
        res.json( doctorDB );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado, comuniquese con el administrador'
        }) 
    }

}
const updateDoctor = async ( req =request, res = response ) => {

    res.json({
        msg: 'updateDoctor'
    });

}
const deleteDoctor = async ( req =request, res = response ) => {

    res.json({
        msg: 'deleteDoctor'
    });

}

module.exports = {
    getDoctors,
    setDoctor,
    updateDoctor,
    deleteDoctor
}