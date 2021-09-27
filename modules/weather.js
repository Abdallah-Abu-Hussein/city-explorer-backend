'use strict';
const axios = require('axios');
let cacheMemory = {};


function weatherHandler(req, res){

  let city = req.query.city;
  const weatherData =`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}`;

  if (cacheMemory[city] !== undefined) {
    res.send(cacheMemory[city]);
  }
  else{
    try{
      axios.get(weatherData).then(weatherRus =>{

        let WeatherArray = weatherRus.data.data.map(weatherForCity => {
          return new Forecast(weatherForCity);
        } );
        cacheMemory[city] = WeatherArray;
        res.send(WeatherArray);
      });
    }
    catch(error ) {
      res.send(error);
    }
  }
}
class Forecast
{
  constructor(weatherForCity ){
    this.date = weatherForCity.valid_date;
    this.description = weatherForCity.weather.description;
  }
}
module.exports = weatherHandler;
