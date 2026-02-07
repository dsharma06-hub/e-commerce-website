let cartCount = 0;
let totalPrice = 0;

function addToCart(price) {
  cartCount++;
  totalPrice += price;

  document.getElementById("cart-count").innerText = cartCount;
  document.getElementById("total-price").innerText = totalPrice;
}