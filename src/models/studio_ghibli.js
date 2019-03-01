const PubSub = require('../helpers/pub_sub.js');

const StudioGhibli = function () {
  this.movies = []
}

StudioGhibli.prototype.getData = function () {
  const requestHelper = fetch('https://ghibliapi.herokuapp.com/films/')
                       .then(response => response.json())
                       .then((data) => {
                    this.movies = data;
                    PubSub.publish('Movies:data-ready', this.movies);
  });
};


module.exports = StudioGhibli;
