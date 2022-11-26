const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        
        await mongoose.connect( process.env.STRING_CONECTION );
        console.log('Databse Online');
        
    } catch (error) {
        console.log( error );
        throw new Error( 'Error, No Connection' );
    }

};


module.exports = {
    dbConnection
}