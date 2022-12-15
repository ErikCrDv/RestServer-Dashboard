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
app.use( cors() );
app.use( express.json() );

//Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))






app.listen( serverPort, () => console.log(`Server is running on port ${ serverPort }`) );