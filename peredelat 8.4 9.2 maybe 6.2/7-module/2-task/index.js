import createElement from '../../assets/lib/create-element.js';

export default class Modal {

  #elem = null;
  constructor() {
    this.#render();
    this.#elem.querySelector(".modal__close").addEventListener("click", this.#buttonClose);
  }

  open = () => {
    document.body.classList.add("is-modal-open");
    document.body.append(this.#elem);
    document.addEventListener("keydown", this.#onClickEsc);
  }

  setTitle = (title) => {
    this.#elem.querySelector(".modal__title").textContent = title;
  }

  setBody = (node) => {
    this.#elem.querySelector(".modal__body").innerHTML = " ";
    this.#elem.querySelector(".modal__body").innerHTML = node;
  }

  close = () => {
    document.body.classList.remove("is-modal-open");
    if (document.querySelector(".modal")) {
      document.querySelector(".modal").remove();
      document.removeEventListener("keydown", this.#onClickEsc);
    }
  }

  #buttonClose = (event) => {
    if (event.target.closest(".modal__close")) {
      this.close();
    }
  }
 
  #onClickEsc = (event) => {
    if (event.code === 'Escape') {
      this.close();
    }
  }
  #render() {
    this.#elem = createElement(`
          <div class="modal">
          <div class="modal__overlay"></div>
          <div class="modal__inner">
          <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="../../assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
          </div>
          <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
          </div>
          </div>
          </div>
          `);
  }

}