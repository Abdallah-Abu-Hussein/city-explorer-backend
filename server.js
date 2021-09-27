'use strict';
// declare a variable to use express library equivalent to import in React
const express = require('express');
require('dotenv').config();
const cors = require('cors');
// server will have the properties and methods in express
const server = express();


const weatherHandler = require('./modules/weather');
const MovieHandler = require('./modules/movie');

// port number
const PORT = process.env.PORT;
server.use(cors());



// Routes
server.get('/',homeHandler);
server.get(`/test`,testHandler);
server.get('/getWeather',weatherHandler);
server.get('/getMovie',MovieHandler);
server.get('*',anythingElseHandler);
// always in the last








//handling / in localhost>>request
function homeHandler(req, res)
{res.status(200).send('Home route LOL');
}
//localhost:3008/test>>>request
function testHandler(req, res)
{res.send('All is good every thing is working, WOW it\'s your first API');
}



//localhost:3001
function anythingElseHandler(req, res)
{res.status(404).send('lol not working ');
}



// making things work
server.listen(PORT, () =>
{console.log(`listening on Port ${PORT} `);
});
