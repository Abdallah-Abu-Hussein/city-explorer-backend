'use strict';
// declare a variable to use express library equivalent to import in React
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
// server will have the properties and methods in express
const server = express();
// const weatherData = require('./data/weather.json');
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




//localhost:3001/getWeatherHandler?City=amman,paris,seattle>
function weatherHandler(req, res){
//   console.log('finally');

  // res.send('good inside weather');
  let city = req.query.city;
  // console.log(city);
  const weatherData =`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}`;
  // console.log(weatherData);

  axios.get(weatherData).then(weatherRus =>{
    // console.log(weatherRus);
    // console.log(weatherRus.data.data);

    let WeatherArray = weatherRus.data.data.map(weatherForCity => {
      return new Forecast(weatherForCity);
    }); res.send(WeatherArray);
  }).catch(error => {
    res.send(error);});
}

function MovieHandler(req, res) {
  let city = req.query.city;

  let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;

  axios.get(movieURL).then(movieResults => {

    let newMovieArray = movieResults.data.results.map(movieForCity => {return new Movie(movieForCity);
    });
    res.send(newMovieArray);
  }).catch(error =>
  { res.send(error); });
}





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
class Forecast
{
  constructor(weatherForCity ){
    this.date = weatherForCity.valid_date;
    this.description = weatherForCity.weather.description;
  }
}

class Movie {
  constructor(movieForCity) {
    this.title = movieForCity.title;
    this.overview= movieForCity.overview;
    this.average_votes= movieForCity.vote_average;
    this.total_votes = movieForCity.vote_count;
    this.image_url = 'https://image.tmdb.org/t/p/w500' + movieForCity.poster_path;
    this.popularity = movieForCity.popularity;
    this.released_on = movieForCity.release_date;
  }
}

// making things work
server.listen(PORT, () =>
{console.log(`listening on Port ${PORT} `);
});
