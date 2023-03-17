import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  #arrow_one = null; 
  #arrow_two = null;
  #carousel = null;
  #maxR = 0;
  #maxL = 0;
  #count = 0;
  constructor(slides) {
    this.slides = slides;
    this.render();
    this.#arrow_one = this.elem.querySelector(".carousel__arrow_right");
    this.#arrow_two = this.elem.querySelector(".carousel__arrow_left");
    this.#carousel = this.elem.querySelector(".carousel__inner");
    this.#arrow_two.style.display = 'none';
    this.#maxR = slides.length - 1;
    this.#arrow_one.addEventListener('click', this.#OnClickRightArr);
    this.#arrow_two.addEventListener('click', this.#OnClickLeftArr);
    this.elem.addEventListener("click", this.#OnclickButton);
  }

  #OnClickRightArr = () => {
    this.#count++;
    this.#arrow_two.style.display = '';
    if (this.#count === this.#maxR) {
      this.#arrow_one.style.display = 'none';
    }
    this.#carousel.style.transform = `translateX(-${this.#carousel.offsetWidth * this.#count}px)`;
  };

  #OnClickLeftArr = () => {
    this.#count--;
    this.#arrow_one.style.display = '';
    if (this.#count === this.#maxL) {
      this.#arrow_two.style.display = 'none';
    }
    this.#carousel.style.transform = `translateX(-${this.#carousel.offsetWidth * this.#count}px)`;
  };

  render() {
    this.elem = createElement(`
    <div class="carousel">
    <!--Кнопки переключения-->
      <div class="carousel__arrow carousel__arrow_right">
        <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${this.slides.map(elem => `
          <div class="carousel__slide" data-id="${elem.id}">
            <img src="../../assets/images/carousel/${elem.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${elem.price.toFixed(2)}</span>
            <div class="carousel__title">${elem.name}</div>
            <button type="button" class="carousel__button">
              <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`).join('')}
      </div>
    </div>`);
  }
  #OnclickButton = (event) => {
    if (event.target.closest(".carousel__button")) {
      this.elem.dispatchEvent(new CustomEvent("product-add", {
        detail: this.slides[this.#count].id,
        bubbles: true
      }));
    }
  };
}
