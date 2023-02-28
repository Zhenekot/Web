import createElement from '../../assets/lib/create-element.js';
export default class ProductCard {
  constructor(product) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.image = product.image;
    this.elem = createElement(`
      <div class="card" id = "${this.id}">
        <div class="card__top">
          <img src="../../assets/images/products/${this.image}" class="card__image" alt="product">
          <span class="card__price">€${this.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.name}</div>
          <button type="button" class="card__button">
            <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
  `);
    this.elem.addEventListener("click", (event) => {
      this.onClick(event)
    });
  }

  onClick(event) {
    if (event.target.closest(".card__button")) {
      this.elem.dispatchEvent(new CustomEvent("product-add", {
        detail: this.id,
        bubbles: true
      }));
    }
  }
}