import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render() || null;

    const arrow_one = this.elem.querySelector(".carousel__arrow_right");
    const arrow_two = this.elem.querySelector(".carousel__arrow_left");
    const carousel = this.elem.querySelector(".carousel__inner");
    const maxR = slides.length - 1;
    const maxL = 0;
    this.count = 0;
    arrow_two.style.display = 'none';
    arrow_one.addEventListener('click', () => {
      this.count++;
      arrow_two.style.display = '';
      if (this.count === maxR) {
        arrow_one.style.display = 'none';
      }
      carousel.style.transform = `translateX(-${carousel.offsetWidth * this.count}px)`;
    });
    arrow_two.addEventListener('click', () => {
      this.count--;
      arrow_one.style.display = '';
      if (this.count === maxL) {
        arrow_two.style.display = 'none';
      }
      carousel.style.transform = `translateX(-${carousel.offsetWidth * this.count}px)`;
    })
  }

  render(){
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

    this.elem.addEventListener("click", (event) => {
      if (event.target.closest(".carousel__button")) {
        this.elem.dispatchEvent(new CustomEvent("product-add", {
          detail: this.slides[this.count].id,
          bubbles: true
        }));
    }});
    
  }
}
