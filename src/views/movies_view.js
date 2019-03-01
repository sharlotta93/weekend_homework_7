const PubSub = require('../helpers/pub_sub.js');
const Display = require('./template.js');

const MoviesView = function (container) {
  this.container = container;
}

MoviesView.prototype.bindEvents = function () {
  PubSub.subscribe('Movies:data-ready', (evt) => {
    this.movies = evt.detail;
    this.render();
  })
};

MoviesView.prototype.render = function () {
  this.movies.forEach((movie) => {
  const movieView = new Display(this.container, movie);
  movieView.render();
  })
};

module.exports = MoviesView;
