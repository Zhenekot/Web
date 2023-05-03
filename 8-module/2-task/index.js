import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  #product = null;
  elem = null;
  #selectProd = [];
  constructor(products) {
    this.#product = products;
    this.#render();
    this.#selectProd = products;
    this.filters = {};
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    if (this.filters.noNuts) {
      this.#product = this.#product.filter(item => !("nuts" in item) || item.nuts === false);
    }

    if (this.filters.vegeterianOnly) {
      this.#product = this.#product.filter(item => item.vegeterian === true);
    }

    if (this.filters.maxSpiciness >= 0 && this.filters.maxSpiciness <= 4) {
      this.#product = this.#product.filter(item => item.spiciness <= this.filters.maxSpiciness);
    }

    if (this.filters.category) {
      this.#product = this.#product.filter(item => item.category === this.filters.category);
    }

    this.elem.querySelector(".products-grid__inner").innerHTML = "";
    let temp = "";
    this.#product.forEach(item => {
      temp += new ProductCard(item).elem.innerHTML;
    });
    this.elem.querySelector(".products-grid__inner").innerHTML = temp;
    this.#product = this.#selectProd;
  }


  #render() {
    let temp = "";
    this.#product.forEach(item => {
      temp += new ProductCard(item).elem.innerHTML;
    });
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
       ${temp}
        </div>
      </div>
    `);
  }
}