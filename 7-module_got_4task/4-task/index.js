import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #steps = null; 
  #value = null;
  elem = null;
  #thumb = null;
  #progress = null;
  #allSteps = 0;
  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.#allSteps = this.#steps - 1;
    this.#render();
    this.#thumb = this.elem.querySelector('.slider__thumb');
    this.#progress = this.elem.querySelector('.slider__progress');
    this.#thumb.style.left = `${this.#value  / this.#allSteps  * 100}%`;
    this.#progress.style.width = `${this.#value  / this.#allSteps  * 100}%`;
    this.elem.addEventListener('pointerdown', this.#onPointerDown); 
    
    this.elem.addEventListener('click', this.#onClickSlide);
     
  }

  #onClickSlide = (event) => {
    this.#accountEvent(event);
    this.#addcustEvent();
  }

  #onPointerDown = () => {
    this.elem.classList.add("slider_dragging");
    document.addEventListener('pointermove', this.#onPointerMove);
    document.addEventListener('pointerup', this.#onPointerUp);
    this.#thumb.ondragstart = () => false;
    this.#thumb.pointermove = () => false;
    this.#thumb.pointerdown = () => false;
  }

  #onPointerMove = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    this.#thumb.style.left = `${leftRelative * 100}%`;
    this.#progress.style.width = `${leftRelative * 100}%`;
    console.log(leftRelative);
    this.#value = Math.round(leftRelative * this.#allSteps);
    this.elem.querySelector('.slider__value').innerHTML = this.#value;
    if (this.elem.querySelector(".slider__step-active")) {
      this.elem.querySelector(".slider__step-active").classList.remove("slider__step-active");
    }
    this.elem.querySelectorAll("span")[this.#value + 1].classList.add("slider__step-active");
  }

  #onPointerUp = (event) =>{

    this.#addcustEvent();
    this.elem.classList.remove("slider_dragging");
    document.removeEventListener('pointermove', this.#onPointerMove);
    document.removeEventListener('pointerup', this.#onPointerUp);
    this.#accountEvent(event);
  }

  #addcustEvent = () => {
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.#value ,
      bubbles: true
    }));
  }

  #accountEvent = (event) =>{
    if (this.elem.querySelector(".slider__step-active")) {
      this.elem.querySelector(".slider__step-active").classList.remove("slider__step-active");
    }
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }
    this.#value = Math.round(leftRelative * this.#allSteps);
    this.#thumb.style.left = `${this.#value / this.#allSteps * 100}%`;
    this.#progress.style.width = `${this.#value / this.#allSteps * 100}%`;
    
    this.elem.querySelector('.slider__value').innerHTML = this.#value;
    this.elem.querySelectorAll("span")[this.#value + 1].classList.add("slider__step-active");
    this.#thumb.querySelector(".slider__value").innerHTML = `${this.#value }`;
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