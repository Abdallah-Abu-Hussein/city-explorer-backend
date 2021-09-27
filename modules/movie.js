'use strict';
const axios = require('axios');
let cacheMemory = {};


function MovieHandler(req, res) {
  let city = req.query.city;

  let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;

  if (cacheMemory[city] !== undefined) {
    // console.log("the data is already exist");
    // console.log(cacheMemory);
    res.send(cacheMemory[city]);
  }else{
    try{
      axios.get(movieURL).then(movieResults => {

        let MovieArray = movieResults.data.results.map(movieForCity => {return new Movie(movieForCity);
        });
        cacheMemory[city] = MovieArray;
        res.send(MovieArray);
      });
    }
    catch(error)
    { res.send(error);
    }

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

module.exports = MovieHandler;
