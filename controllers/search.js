const { request, response } = require("express");

//Models
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const searchAll = async ( req =request, res = response ) => {
    const keyword = req.params.keyword;
    const regex = new RegExp( keyword, 'i' );

    const [ user, doctor, hospital ] = await Promise.all([
        User.find({ name: regex }),
        Doctor.find({ name: regex }),
        Hospital.find({ name: regex }),
    ]);

    res.json( { keyword, user, doctor, hospital } );

}

const searchByCollection = async ( req =request, res = response ) => {
    const collection = req.params.collection;
    const keyword = req.params.keyword;
    const regex = new RegExp( keyword, 'i' );

    let dataResponse = [];
    switch ( collection ) {
        case 'users':
            dataResponse = await User.find({ name: regex });
            break;
            
        case 'doctors':
            dataResponse = await Doctor.find({ name: regex })
                                       .populate('user', 'name img')
                                       .populate('hospital', 'name img');
            break;
        
        case 'hospitals':
            dataResponse = await Hospital.find({ name: regex })
                                         .populate('user', 'name img');
            break;
    
        default:
            return res.status(400).json({
                msg: 'La colecion solicitada no existe'
            });
    }

    res.json( { keyword, dataResponse } );
}

module.exports = {
    searchAll,
    searchByCollection
}