import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {

  #categories = null;
  elem = null;
  #RightButton = null;
  #LeftButton = null;
  #ribbonInner = null;
  constructor(categories) {
    this.#categories = categories;
    this.render();
    // this.elem.querySelectorAll(".ribbon__item").find(function (item) {
    //   if (item.dataset.id === "") {
    //     item.classList.add("ribbon__item_active")
    //   }
    // });
    // this.elem.getElementById("").classList.add("ribbon__item_active");

    this.#RightButton = this.elem.querySelector(".ribbon__arrow_right");
    this.#LeftButton = this.elem.querySelector(".ribbon__arrow_left ");
    this.#ribbonInner = this.elem.querySelector(".ribbon__inner");

    this.#LeftButton.classList.remove("ribbon__arrow_visible");
    this.#RightButton.classList.add("ribbon__arrow_visible");

    this.#LeftButton.addEventListener('click', this.#onClickArr);
    this.#RightButton.addEventListener('click', this.#onClickArr);

    this.#ribbonInner.addEventListener('scroll', this.#onClickVisible);
    this.#ribbonInner.addEventListener('click', this.#onClickButAdd);
  }

  #onClickVisible = () => {
    let scrollRight = this.#ribbonInner.scrollWidth - this.#ribbonInner.scrollLeft - this.#ribbonInner.clientWidth;

    if (scrollRight < 1) {
      this.#RightButton.classList.remove('ribbon__arrow_visible');
    }
    if (this.#ribbonInner.scrollLeft > 1) {
      this.#LeftButton.classList.add('ribbon__arrow_visible');
    }
    if (this.#ribbonInner.scrollLeft < 1) {
      this.#LeftButton.classList.remove('ribbon__arrow_visible');
    }
    if (scrollRight > 1) {
      this.#RightButton.classList.add('ribbon__arrow_visible');
    }
  }

  #onClickArr = (event) => {
    if (event.target.closest(".ribbon__arrow_left")) {
      this.#ribbonInner.scrollBy(-350, 0);
    }

    if (event.target.closest(".ribbon__arrow_right")) {
      this.#ribbonInner.scrollBy(350, 0);
    }
  }

  #onClickButAdd = (event) => {
    event.preventDefault();
    let activeElem = event.target;
    let selectionElement = this.#ribbonInner.querySelector(".ribbon__item_active");
    activeElem.classList.add("ribbon__item_active");
    let selectionAllElements = this.#ribbonInner.querySelectorAll(".ribbon__item_active");
    if (selectionAllElements.length > 1) {
      selectionElement.classList.remove("ribbon__item_active")
    }

    let eventId = new CustomEvent('ribbon-select', {
      detail: activeElem.getAttribute("data-id"),
      bubbles: true
    });
    this.elem.dispatchEvent(eventId);
  }


  render() {
    this.elem =  createElement(`
    <div class="ribbon">
    <!--Кнопка прокрутки влево-->
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <!--Ссылки на категории-->
    <nav class="ribbon__inner">
     ${this.#categories.map(categoria => `
      <a href="#" class="ribbon__item" data-id="${categoria.id}">${categoria.name}</a>`).join('')} 
     
    </nav>
    <!--Кнопка прокрутки вправо-->
    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`);

    let arr = this.elem.querySelectorAll(".ribbon__item");
    let temp = arr[0];
    temp.classList.add("ribbon__item_active");
  }
}

// ${this.#categories.map(function(categoria) {
//   `<a href="#" class="ribbon__item" data-id="${categoria.id}">${categoria.name}</a>`.join('')
//     if(categoria.datase.id = ""){
//       categoria.classList.add("ribbon__item_active")
//     }
// })}
