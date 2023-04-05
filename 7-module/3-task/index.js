import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {

  #steps = 0;
  #value = 0;
  elem = null;
  #allSteps = 0;
  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.#allSteps = this.#steps - 1;
    this.#render();
    this.elem.querySelector('.slider__thumb').style.left = `${this.#value  / (this.#allSteps ) * 100}%`;
    this.elem.querySelector('.slider__progress').style.width = `${this.#value  / (this.#allSteps ) * 100}%`;
    this.elem.addEventListener('click', this.#onClickSlide);
  }

  #onClickSlide = (event) => {
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    
    let valueTemp = Math.round((event.clientX - this.elem.getBoundingClientRect().left) / this.elem.getBoundingClientRect().width * (this.#allSteps ));
    let percent = valueTemp / (this.#allSteps ) * 100;

    thumb.style.left = `${percent}%`;
    progress.style.width = `${percent}%`;
    if (this.elem.querySelector(".slider__step-active")) {
      this.elem.querySelector(".slider__step-active").classList.remove("slider__step-active");
    }
    this.elem.querySelectorAll("span")[valueTemp].classList.add("slider__step-active");
    thumb.querySelector(".slider__value").innerHTML = `${valueTemp}`;

    let valSlider = new CustomEvent('slider-change', {
      detail: valueTemp,
      bubbles: true
    });
    this.elem.dispatchEvent(valSlider);

  }

  #render() {
    this.elem = createElement(`
  <div class="slider">
  <!--Ползунок слайдера с активным значением-->
  <div class="slider__thumb">
    <span class="slider__value">${this.#value}</span>
  </div>
  <!--Полоска слайдера-->
  <div class="slider__progress"></div>
  <!-- Шаги слайдера (вертикальные чёрточки) -->
  <div class="slider__steps">
    
  </div>
</div>
  `)

    for (let i = 0; i < this.#steps; i++) {
      let spanElem = document.createElement("span");
      this.elem.querySelector(".slider__steps").append(spanElem);
      if (i === this.#value) {
        this.elem.querySelector(".slider__steps").querySelector("span").classList.add("slider__step-active")
      }
    }
  }
}