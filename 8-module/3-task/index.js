export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product) {
      let TempInd = this.cartItems.findIndex(item => item.product.id === product.id);
      if (TempInd >= 0) {
        this.cartItems[TempInd].count++;
      } else {
        this.cartItems.push({ product: product, count: 1});
      }
    }
    // console.log(this.cartItems);
    this.onProductUpdate(this.cartItems);
  }
  updateProductCount(productId, amount) {
    let tempProductInd = this.cartItems.findIndex(elem => elem.product.id === productId);
    if (this.cartItems[tempProductInd].count > 0) {
      this.cartItems[tempProductInd].count += (amount);
    }
    if (this.cartItems[tempProductInd].count === 0) {
      this.cartItems.splice(tempProductInd, 1);
    }
    // console.log(this.cartItems);
    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.map(elem => totalCount += elem.count);
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.map(elem => totalPrice += elem.product.price * elem.count);
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
