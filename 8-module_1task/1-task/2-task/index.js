import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  #product = null;
  elem = null;
  constructor(products) {
    this.#product  = products;
    this.#render();
    this.filters = {};
    
  }
  updateFilter(filters){
    Object.assign(this.filters, filters);
    let arrProduct = [];
    for(let item of this.#product){
      if (this.filters.noNuts && item.nuts){
        continue;
      } 
      if(this.filters.vegeterianOnly && !item.vegeterian){
        continue;
      }
      if(this.filters.maxSpiciness && item.spiciness > this.filters.maxSpiciness){
        continue;
      }
      if(this.filters.category && this.filters.category !== item.category){
        continue;
      }
      arrProduct.push(item);
    }
    this.elem.querySelector(".products-grid__inner").innerHTML = "";
    let temp = "";
    arrProduct.forEach(item => {
      temp += new ProductCard(item).elem.innerHTML;
    });
    this.elem.querySelector(".products-grid__inner").innerHTML = temp;
  }
  #render(){
    let temp = "";
    this.#product.forEach(item => {
      temp += new ProductCard(item).elem.innerHTML;
    });
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
       ${temp}
        </div>
      </div>
    `);
  }
}