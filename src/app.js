const StudioGhibli = require('./models/studio_ghibli.js');
const MoviesView = require('./views/movies_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const movieContainer = document.querySelector('.movie');
  const movieListView = new MoviesView(movieContainer);
  movieListView.bindEvents();

  const movies = new StudioGhibli();
  movies.getData();
});
