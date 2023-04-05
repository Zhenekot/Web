export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if(product !== null){
      if (this.cartItems.includes(product)){
        this.cartItems.find(item => item.id === product.id).count++;
      }else{
        product.count = 1;
        this.cartItems.push(product)
      }

      
    };
    console.log(this.cartItems);
  }

  updateProductCount(productId, amount) {
    
  }

  isEmpty() {
    // ваш код
  }

  getTotalCount() {
    // ваш код
  }

  getTotalPrice() {
    // ваш код
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
