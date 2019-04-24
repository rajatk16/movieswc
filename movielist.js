import './movie-item.js';
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      text-align: center;
    }
    button {
      border: 2px solid blue;
      cursor: pointer;
      margin: 25px;
    }
    input {
      border: 2px solid black;
      margin: 5px;
    }
    ul {
      list-style: none;
      padding: 25px;
    }
  </style>
  <h1>My Movie List (2019)</h1>
  <div>
    <input id="name" type="text" placeholder="Enter movie name"/>
  </div>
  <div>
    <input id="date" type="text" placeholder="Enter release date"/>
  </div>
  <button>Add</button>

  <ul id="movies"></ul>
`;

class MovieList extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({'mode': 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$movieList = this._shadowRoot.querySelector('ul');
    this.$movieName = this._shadowRoot.getElementById('name');
    this.$movieDate = this._shadowRoot.getElementById('date');
    this.$button = this._shadowRoot.querySelector('button');
    this.$button.addEventListener('click', this._addMovie.bind(this));
  }

  _addMovie() {
    if(this.$movieName.value.length > 0 && this.$movieDate.value.length > 0) {
      this._movies.push({title: this.$movieName.value, date: this.$movieDate.value})
      this._renderMovieList();
      this.$movieName.value = '';
      this.$movieDate.value = '';
    }
  }
  _renderMovieList() {
    this.$movieList.innerHTML = '';

    this._movies.forEach((movie, index) => {
      // let $movieItem = document.createElement(`li`);
      let $movieItem = document.createElement(`movie-item`);
      // $movieItem.innerHTML = movie.title + `<br>` + movie.date + `<hr>`;
      $movieItem.setAttribute('title', movie.title);
      $movieItem.setAttribute('date', movie.date);

      $movieItem.setAttribute('index', index);
      $movieItem.addEventListener('onRemove', this._removeMovie.bind(this));
      this.$movieList.appendChild($movieItem);
    });
  }
  _removeMovie(event) {
    this._movies.splice(event.detail, 1);
    this._renderMovieList();
  }
  set movies(value) {
    this._movies = value;
    this._renderMovieList();
  }
  get movies() {
    return this._movies;
  }
}

window.customElements.define('movie-list', MovieList);