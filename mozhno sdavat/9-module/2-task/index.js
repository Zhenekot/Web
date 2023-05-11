import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  
  #carousel = null;
  #ribbonMenu = null;
  #stepSlider = null;
  #cartIcon = null;
  constructor() {
    this.#carousel = new Carousel(slides);
    this.#ribbonMenu = new RibbonMenu(categories);
    this.#stepSlider = new StepSlider({ steps: 5, value: 3 });
    this.#cartIcon = new CartIcon();

  }

  async render() {
    document.querySelector("[data-carousel-holder]").append(this.#carousel.elem);

    document.querySelector("[data-ribbon-holder]").append(this.#ribbonMenu.elem);

    document.querySelector("[data-slider-holder]").append(this.#stepSlider.elem);

    document.querySelector("[data-cart-icon-holder]").append(this.#cartIcon.elem);

    let cart = new Cart(this.#cartIcon);

    async function getProductList() {
      return await fetch('products.json').then(response => response.json());
    }

    let productList = await getProductList();//this

    let productGrid = new ProductsGrid(productList);
    let dataProductsGrid = document.querySelector("[data-products-grid-holder]");
    dataProductsGrid.innerHTML = "";
    dataProductsGrid.append(productGrid.elem);

    productGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.#stepSlider.value,
      category: this.#ribbonMenu.value
    });

    document.body.addEventListener("product-add", (event) => {
      let productToAdd = productList.find((product) => product.id === event.detail);
      cart.addProduct(productToAdd);
    });

    this.#stepSlider.elem.addEventListener("slider-change", (event) => {
      productGrid.updateFilter({
        maxSpiciness: event.detail,
      });
    });

    this.#ribbonMenu.elem.addEventListener("ribbon-select", (event) => {
      productGrid.updateFilter({
        category: event.detail,
      });
    });

    document.querySelector(".filters").addEventListener("change", (event) => {
      if (event.target.closest("#nuts-checkbox")) {
        productGrid.updateFilter({
          noNuts: event.target.checked,
        });
      }
      if (event.target.closest("#vegeterian-checkbox")) {
        productGrid.updateFilter({
          vegeterianOnly: event.target.checked,
        });
      }
    });
  }
}