function initCarousel() {
  const arrow_one = document.querySelector(".carousel__arrow_right");
  const arrow_two = document.querySelector(".carousel__arrow_left");
  const carousel = document.querySelector(".carousel__inner");
  const maxR = 3;
  const maxL = 0;
  let count = 0;
  arrow_two.style.display = 'none';
  arrow_one.addEventListener('click',() =>{
    count++;
    arrow_two.style.display = '';
    if(count === maxR){
      arrow_one.style.display = 'none';
    }
    carousel.style.transform = `translateX(-${carousel.offsetWidth * count}px)`;
  });
  arrow_two.addEventListener('click',() =>{
    count--;
    arrow_one.style.display = '';
    if(count === maxL){
      arrow_two.style.display = 'none';
    }
    carousel.style.transform = `translateX(-${carousel.offsetWidth * count}px)`;

  })
}
