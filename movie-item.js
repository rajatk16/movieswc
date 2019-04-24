const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    button {
      border: 1px solid black;
      cursor: pointer;
    }
  </style>
  <li class="item">
    <input type="checkbox">
    <label></label>
    <p></p>
    <button>Remove</button>
    <hr>
  </li>
`;

export default class MovieItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({'mode': 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$item = this._shadowRoot.querySelector('.item');
    this.$removeButton = this._shadowRoot.querySelector('button');
    this.$title = this._shadowRoot.querySelector('label');
    this.$date = this._shadowRoot.querySelector('p');
    this.$checkbox = this._shadowRoot.querySelector('input');
    this.$removeButton.addEventListener('click', (event) => {
      this.dispatchEvent(new CustomEvent('onRemove', {detail: this.index}));
    });
    this.toggle = false;
  }
  
  _toggleReleased() {
    if (this.toggle == false){
      this.$title.style.cssText = 'text-decoration: line-through;';
      this.$date.style.cssText = 'text-decoration: line-through;';
      this.toggle = true;
    } else {
      this.$title.style.cssText = 'text-decoration: none;';
      this.$date.style.cssText = 'text-decoration: none;';
      this.toggle = false;
    }
  }

  connectedCallback() {
    if(!this.hasAttribute('title')) {
      this.setAttribute('title', 'placeholder Title');
    }
    if(!this.hasAttribute('date')) {
      this.setAttribute('date', 'placeholder Date');
    }
    this._renderMovieItem();
  }
  _renderMovieItem() {
    this.$title.innerHTML = this._title;
    this.$date.innerHTML = this._date;
  }
  static get observedAttributes() {
    return ['title', 'date', 'index'];
  }
  set index(value) {
    this.setAttribute('index', value);
  }
  get index() {
    return this._index;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'title':
        this._title = newValue;
        break;
      case 'date':
        this._date = newValue;
        break;
      case 'index':
        this._index = parseInt(newValue);
        break;
    }
  }
}
window.customElements.define('movie-item', MovieItem);