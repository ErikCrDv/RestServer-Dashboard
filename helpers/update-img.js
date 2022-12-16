const fs = require('fs');

//Models
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');


const deleteImg = ( path ) => {
    if( fs.existsSync( path ) ){
        //Borrar Img
        fs.unlinkSync( path );
    }

}

const updateImg = async (collection, id, newFileName) => {

    let path = '';
    switch ( collection ) {
        case 'users':
            const user = await User.findById( id );
            if( !user ){ return false; }

            path = `./uploads/users/${ user.img }`;
            deleteImg( path );


            user.img = newFileName;
            await user.save();
            return true;

        break;
        case 'doctors':
            const doctor = await Doctor.findById( id );
            if( !doctor ){ return false; }

            path = `./uploads/doctors/${ doctor.img }`;
            deleteImg( path );


            doctor.img = newFileName;
            await doctor.save();
            return true;
        break;
        case 'hospitals':
            const hospital = await Hospital.findById( id );
            if( !hospital ){ return false; }

            path = `./uploads/hospitals/${ hospital.img }`;
            deleteImg( path );


            hospital.img = newFileName;
            await hospital.save();
            return true;
            
        break;
    
        default:
            break;
    }
}

module.exports = {
    updateImg
}