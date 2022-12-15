const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {
    return new Promise( ( resolve, reject ) => {

        const payload = {
            uid
        }
    
        jwt.sign( payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '12h'
        }, ( error, token ) => {
            if( error ){
                console.log( error );
                reject( 'No se pudo generar el JWT' );
            }else{
                resolve( token );
            }
        });

    });

}

module.exports = {
    generateJWT
}