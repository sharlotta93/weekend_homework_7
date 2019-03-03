const PubSub = require('../helpers/pub_sub.js');
let movies = [];

const StudioGhibli = function () {
  this.movies = []
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
  var directors = [];
  const movies = data;
  movies.forEach((movie) => {
    for(let i = 0;i < movies.length; i++){
        if(directors.indexOf(movie.director) === -1) {
            directors.push(movie.director)
        };
      };
  });
    PubSub.publish('Directors:data-ready', directors);
};


module.exports = StudioGhibli;
