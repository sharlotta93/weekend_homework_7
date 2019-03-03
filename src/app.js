const StudioGhibli = require('./models/studio_ghibli.js');
const MoviesView = require('./views/movies_view.js');
const SelectView = require('./views/select_view.js');


document.addEventListener('DOMContentLoaded', () => {
  const selectElement = document.querySelector('select#director-select');
  const selectView = new SelectView(selectElement);
  selectView.bindEvents();

  const movieContainer = document.querySelector('.movie');
  const movieListView = new MoviesView(movieContainer);
  movieListView.bindEvents();

  const movies = new StudioGhibli();
  movies.getData()
        .then(data => movies.getDirectors(data))
        .then(data => movies.bindEvents(data))
});
