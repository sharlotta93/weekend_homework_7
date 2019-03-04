const PubSub = require('../helpers/pub_sub.js');
let movies = [];

const StudioGhibli = function () {
  this.movies = []
  this.directors = []
}

StudioGhibli.prototype.getData = function () {
    return fetch('https://ghibliapi.herokuapp.com/films/')
    .then(response => response.json())
    .then((data) => new Promise(function(resolve, reject) {
      this.movies = data;
      PubSub.publish('Movies:data-ready', this.movies);
      resolve(data);
    })
  )
};

StudioGhibli.prototype.getDirectors = function (data) {
return new Promise( (resolve, reject) => {
  let directors = this.directors;
  const movies = data;
  movies.forEach((movie) => {
    for(let i = 0;i < movies.length; i++){
        if(directors.indexOf(movie.director) === -1) {
            directors.push(movie.director)
        };
      };
  });
    PubSub.publish('Directors:data-ready', directors);
    resolve(data)
 });
};

StudioGhibli.prototype.bindEvents = function (data) {
  PubSub.subscribe('SelectView:change', (evt) => {
    this.getMoviesByDirector(evt.detail, data);
  })
};

StudioGhibli.prototype.getMoviesByDirector = function (directorIndex, data) {
  const chosenDirector = this.directors[directorIndex];
  const finalMovies = data.filter((movie) => {
  return movie.director === chosenDirector;
  });
  PubSub.publish('Movies:data-ready', finalMovies);
};


module.exports = StudioGhibli;
