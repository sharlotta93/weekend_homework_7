const PubSub = require('../helpers/pub_sub.js');
let movies = [];

const StudioGhibli = function () {
  this.movies = []
}

StudioGhibli.prototype.getData = function () {
  fetch('https://ghibliapi.herokuapp.com/films/')
  .then(response => response.json())
  .then((data) => {
    this.movies = data;
    PubSub.publish('Movies:data-ready', this.movies);
  });
};

StudioGhibli.prototype.getDirectors = function () {
  const directors = [];

  console.log(this.movies);

  this.movies.forEach((movie) => {
    const director = movie.director;
    directors.push(director);
  });
  PubSub.publish('Directors:data-ready', directors);
}


module.exports = StudioGhibli;
