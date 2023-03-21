import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {

  steps = null;
  elem = null;
  #slide = null;
  constructor({ steps, value = 0 }) {
  this.steps = steps;
  this.#render(value);
  this.#slide = this.elem.querySelector(".slider");
  this.#slide.addEventListener('click', this.#onClickSlide);
  }

  #onClickSlide = () =>{
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    let leftPercents = 55; // Значение в процентах от 0 до 100

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
  }

  #render(value){
    this.elem = createElement(`
    <div class="slider">

    <!--Ползунок слайдера с активным значением-->
    <div class="slider__thumb">
      <span class="slider__value">${value}</span>
    </div>
  
    <!--Полоска слайдера-->
    <div class="slider__progress"></div>
  
    <!-- Шаги слайдера (вертикальные чёрточки) -->
    <div class="slider__steps">
      
    </div>
  </div>
    `)

    for(let i = 0; i < this.steps; i++){
      let spanElem = document.createElement("span");
      this.elem.querySelector(".slider__steps").append(spanElem);
      if(i === value){
        this.elem.querySelector(".slider__steps").querySelector("span").classList.add("slider__step-active")
      }
    }
  }
}
