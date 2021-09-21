'use strict';
// declare a variable to use express library equivalent to import in React
const express = require('express');
require('dotenv').config();
const cors = require('cors');
// server will have the properties and methods in express
const server = express();
const weatherData = require('./data/weather.json');
// port number
//localhost : 3008
const PORT = process.env.PORT;
server.use(cors());

//sending back weatherData
//localhost:
// server.get('/weather',(req,res) =>
// { res.send(weatherData);
// });
class Forecast
{
  constructor(date, description){
    this.date = date;
    this.description = description;
  }

}
//localhost:3008/weather?city=amman
server.get('/weather', (req, res) =>
{
  try{
    let City = weatherData.find(weather =>
    {if (weather.city_name.toLocaleLowerCase()=== req.query.city)//toUpperCase will break the code
    {return weather;
    }
    });
    let weatherData2 = City.data.map(weatherForCity => {
      return new Forecast(weatherForCity.valid_date, weatherForCity.weather.description); });
    res.status(200).send(weatherData2);
  } catch (err) {
    res.status(500).send('Error 500: Wrong request add city name to your URL');
  }
});


//handling / in localhost>>request
server.get('/', (req, res)=>
{res.status(200).send('Home route LOL');
});
//localhost:3008/test>>>request
// server.get(`/test`, (request, response) =>
// {response.send('All is good every thing is working, WOW it\'s your first API');
// });
//localhost:3008
// server.get('*', (req, res) =>
// {res.status(404).send('lol not working ');
// });

// making things work
server.listen(PORT, () =>
{console.log(`listening on Port ${PORT} `);
});
