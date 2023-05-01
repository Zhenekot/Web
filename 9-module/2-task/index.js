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
  #cart = null;
  constructor() {
    this.#carousel = new Carousel(slides);
    this.#ribbonMenu = new RibbonMenu(categories);
    this.#stepSlider = new StepSlider({ steps: 3 });
    this.#cartIcon = new CartIcon();
    this.#cart = new Cart(this.#cartIcon);
  }

  async render() {
    document.querySelector("[data-carousel-holder]").append(this.#carousel.elem);
    document.querySelector("[data-ribbon-holder]").append(this.#ribbonMenu.elem);
    document.querySelector("[data-slider-holder]").append(this.#stepSlider.elem);
    document.querySelector("[data-slider-holder]").append(this.#cartIcon.elem);

    let productList = await fetch('products.json').then(response => response.json());
    // async function getProductList() {
    //   return await fetch('products.json').then(response => response.json());
    // }

    // let productList = await getProductList();

    let productGrid = new ProductsGrid(productList);
    let dataProductsGrid = document.querySelector("[data-products-grid-holder]");
    dataProductsGrid.innerHTML = "";
    dataProductsGrid.append(productGrid.elem);

    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.#stepSlider.value,
      category: this.#ribbonMenu.value
    });

    document.body.addEventListener("product-add", (event) => {
      let productToAdd = productList.find((product) => product.id === event.detail);
      this.#cart.addProduct(productToAdd.elem);
    });

    this.#stepSlider.elem.addEventListener("slider-change", (event) => {
      productsGrid.updateFilter({
        maxSpiciness: event.detail,
      });
    });

    this.#ribbonMenu.elem.addEventListener("ribbon-select", (event) => {
      productsGrid.updateFilter({
        category: event.detail,
      });
    });

    document.querySelector(".filters").addEventListener("change", (event) => {
      if (event.target.closest("#nuts-checkbox")) {
        productsGrid.updateFilter({
          noNuts: event.target.checked,
        });
      }
      if (event.target.closest("#vegeterian-checkbox")) {
        productsGrid.updateFilter({
          vegeterianOnly: event.target.checked,
        });
      }
    });
  }
}
