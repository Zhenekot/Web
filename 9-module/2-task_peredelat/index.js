import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
   
  }

  async render() {
    let carousel = new Carousel(slides);
    document.querySelector("[data-carousel-holder]").append(carousel.elem);

    let ribbonMenu = new RibbonMenu(categories);
    document.querySelector("[data-ribbon-holder]").append(ribbonMenu.elem);

    let stepSlider = new StepSlider({ steps: 3 });
    document.querySelector("[data-slider-holder]").append(stepSlider.elem);

    let cartIcon = new CartIcon();
    document.querySelector("[data-cart-icon-holder]").append(cartIcon.elem);

    let cart = new Cart(cartIcon);

    // let productList = await fetch('products.json').then(response => response.json());
    async function getProductList() {
      return await fetch('products.json').then(response => response.json());
    }

    let productList = await getProductList();

    let productGrid = new ProductsGrid(productList);
    let dataProductsGrid = document.querySelector("[data-products-grid-holder]");
    dataProductsGrid.innerHTML = "";
    dataProductsGrid.append(productGrid.elem);

    productGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value
    });

    document.body.addEventListener("product-add", (event) => {
      let productToAdd = productList.find((product) => product.id === event.detail);
      cart.addProduct(productToAdd);
    });

    stepSlider.elem.addEventListener("slider-change", (event) => {
      productGrid.updateFilter({
        maxSpiciness: event.detail,
      });
    });

    ribbonMenu.elem.addEventListener("ribbon-select", (event) => {
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