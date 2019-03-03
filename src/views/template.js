const Display = function (container, movie) {
  this.container = container;
  this.movie = movie;
}

Display.prototype.render = function () {
  const movieContainer = document.createElement('div');
  movieContainer.classList.add('movie-container');

  const name = this.getName();
  movieContainer.appendChild(name);

  const description = this.getDescription();
  movieContainer.appendChild(description);

  const otherInfo = this.createList();
  movieContainer.appendChild(otherInfo);

  this.container.appendChild(movieContainer);
};

Display.prototype.getName = function () {
  const name = document.createElement('h2');
  if (!this.movie.title) {
    name.textContent = "Misc";
  } else {
    name.textContent = this.movie.title;
  }
  return name;
};

Display.prototype.getDescription = function () {
  const description = document.createElement('p');
  //description.classList.add('description');
  if (!this.movie.description) {
    description.textContent = "Misc";
  } else {
    description.textContent = this.movie.description;
  }
  return description;
};

Display.prototype.createList = function () {
  const list = document.createElement('ul');
  list.classList.add('movie-info');
  this.populateList(list);
  return list;
};

Display.prototype.populateList = function (list) {
    movie = this.movie;
    let listItem = document.createElement('li');
    listItem.textContent = movie.director;
    list.appendChild(listItem);

    listItem = document.createElement('li');
    listItem.textContent = movie.release_date;
    list.appendChild(listItem);

    listItem = document.createElement('li');
    listItem.textContent = movie.rt_score;
    list.appendChild(listItem);

};




module.exports = Display;
