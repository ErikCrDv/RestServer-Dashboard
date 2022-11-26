require('dotenv').config();
const express = require('express');
const cors = require('cors');

//Module Import 
const { dbConnection } = require('./database/config');

//Variables
const serverPort = process.env.SERVER_PORT

// Create Express Server
const app = express();

// Database Connection
dbConnection();

//Middlewares
app.use( cors() )



//Routes
app.get('/', ( req, res ) => {
    res.status(400).json({
        ok: true,
        msg: 'Hello World'
    });
});






app.listen( serverPort, () => console.log(`Server is running on port ${ serverPort }`) );