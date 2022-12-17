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
    const uid = req.uid;
    const { id } = req.params;
    
    try {
        const hospital = Hospital.findById( id );
        if( !hospital ){
            return res.status(400).json({
                msg: 'Hospital con el id ingresado no existe'
            });
        }

        // Update
        const changeHospital = { 
            ...req.body,
            user: uid
        };

        const hospitalUpdate = await Hospital.findByIdAndUpdate( id, changeHospital, { new: true });

        res.json( hospitalUpdate );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado, comuniquese con el administrador'
        })  
    }


}
const deleteHospital = async ( req =request, res = response ) => {
    
    const { id } = req.params;
    try {
        // User Exists ?
        const hospital = await Hospital.findById( id );
        if( !hospital ){
            return res.status(400).json({
                msg: 'No existe un hospital con el id ingresado'
            });
        }

        await Hospital.findByIdAndDelete( id );
        res.json({ msg: 'Hospital Eliminado' })
        
    } catch (error) {
        console.log( error );res.status(500).json({
            msg: 'Error Inesperado... Revisar logs'
        });
    }
}

module.exports = {
    getHospitals,
    setHospital,
    updateHospital,
    deleteHospital
}