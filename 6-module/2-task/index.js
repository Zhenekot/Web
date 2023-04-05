import createElement from '../../assets/lib/create-element.js';
export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.render(product) || null; 
  }

  render(product) {
    this.elem = createElement(`
    <div>
    <div class="card" id = "${product.id}">
      <div class="card__top">
        <img src="../../assets/images/products/${product.image}" class="card__image" alt="product">
        <span class="card__price">€${product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${product.name}</div>
        <button type="button" class="card__button">
          <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    </div>
  `);
  this.elem.addEventListener("click", this.#OnclickButton);
  }
  #OnclickButton = (event) => {
  if (event.target.closest(".card__button")) {
    this.elem.dispatchEvent(new CustomEvent("product-add", {
      detail: this.product.id,
      bubbles: true
    }));
  }
};
}

