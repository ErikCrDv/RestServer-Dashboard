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

    const uid = req.uid;
    const { id } = req.params;

    try {
        const doctor = await Doctor.findById( id );
        if( !doctor ){
            return res.status(404).json({
                msg: 'No existe un doctor con el id ingresado'
            });
        }

        const doctorFields = {
            ...req.body,
            user: uid
        }
        const doctorUpdate = await Doctor.findByIdAndUpdate( id, doctorFields, { new: true } );
        res.json( doctorUpdate );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado, comuniquese con el administrador'
        }) 
    }

}

const deleteDoctor = async ( req =request, res = response ) => {

    const { id } = req.params;
    try {
        // User Exists ?
        const doctor = await Doctor.findById( id );
        if( !doctor ){
            return res.status(404).json({
                msg: 'No existe un doctor con el id ingresado'
            });
        }

        await Doctor.findByIdAndDelete( id );
        res.json({ msg: 'doctor Eliminado' })
        
    } catch (error) {
        console.log( error );res.status(500).json({
            msg: 'Error Inesperado... Revisar logs'
        });
    }
}

module.exports = {
    getDoctors,
    setDoctor,
    updateDoctor,
    deleteDoctor
}