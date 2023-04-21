import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {
      let TempInd = this.cartItems.findIndex(item => item.product.id === product.id);
      if (TempInd >= 0) {
        this.cartItems[TempInd].count++;
      } else {
        this.cartItems.push({ product: product, count: 1 });
      }
    }
    // console.log(this.cartItems);
    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    let tempProductInd = this.cartItems.findIndex(elem => elem.product.id === productId);
    if (this.cartItems[tempProductInd]) {
      if (this.cartItems[tempProductInd].count) {
        this.cartItems[tempProductInd].count += (amount);
      }
      if (!this.cartItems[tempProductInd].count) {
        this.cartItems.splice(tempProductInd, 1);
      }
    }
    // console.log(this.cartItems);
    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(` <div>
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<div> <form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>
    </div>`);
  }

  renderModal() {
    let modal = new Modal();
    let modalWindow = "";
    modal.setTitle('Your order');

    this.cartItems.map(item => modalWindow += this.renderProduct(item.product, item.count).innerHTML);
    modalWindow += this.renderOrderForm().innerHTML;
    modal.setBody(modalWindow);

    modal.open();
    document.querySelector(".modal").addEventListener("click", (event) => counter(event));

    let counter = (event) => {
      if (event.target.closest(".cart-counter__button_minus")) {
        this.targetId = event.target.closest(".cart-product").getAttribute("data-product-id");

        for (let elem of this.cartItems) {
          if (this.targetId === elem.product.id) {
            this.updateProductCount(this.targetId, -1)
            this.onProductUpdate(this.cartItems);
          }
        }
      }

      if (event.target.closest(".cart-counter__button_plus")) {
        this.targetId = event.target.closest(".cart-product").getAttribute("data-product-id");

        for (let elem of this.cartItems) {
          if (this.targetId === elem.product.id) {
            this.updateProductCount(this.targetId, 1)
            this.onProductUpdate(this.cartItems);
          }
        }
      }
    }

    if (document.querySelector(".cart-form")) {
      document.querySelector(".cart-form").addEventListener("submit", (event) => {
        event.preventDefault();
        this.onSubmit();
      });
    }

  }

  onProductUpdate(cartItem) {
    console.log(this.targetId);
    if (document.querySelector(".is-modal-open")) {
      for (let elem of this.cartItems) {
        if (this.targetId === elem.product.id) {
          document.querySelector(`[data-product-id="${this.targetId}"] .cart-counter__count`).textContent = elem.count;
          document.querySelector(`[data-product-id="${this.targetId}"] .cart-product__price`).textContent = `€${(elem.product.price * elem.count).toFixed(2)}`;
          document.querySelector(".cart-buttons__info-price").innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
        }
      }
    }
    if (this.cartItems.length === 0) {
      document.body.classList.remove("is-modal-open");
      if (document.querySelector(".modal")) {
        document.querySelector(".modal").remove();
      }
    }
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    document.querySelector("[type=submit]").classList.add("is-loading");

    let form = document.querySelector(".cart-form");

    let result = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form)
    });

    result.then(() => {
      document.querySelector(".modal__title").textContent = "Success!";
      this.cartItems = [];

      document.querySelector(".modal__body").innerHTML = `
        <div class="modal__body-inner">
          <p>
             Order successful! Your order is being cooked :) <br>
             We’ll notify you about delivery time shortly.<br>
             <img src="/assets/images/delivery.gif">
          </p>
        </div>`;
    });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
