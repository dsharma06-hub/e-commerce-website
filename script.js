// Cart functionality
let cartCount = 0;
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.getElementById('cart-count');
    const cartCountSummaryElement = document.getElementById('cart-count-summary');
    const totalPriceElement = document.getElementById('total-price');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const price = parseFloat(this.getAttribute('data-price'));
            cartCount++;
            totalPrice += price;

            if (cartCountElement) cartCountElement.textContent = cartCount;
            if (cartCountSummaryElement) cartCountSummaryElement.textContent = cartCount;
            if (totalPriceElement) totalPriceElement.textContent = totalPrice.toFixed(2);

            // Simple feedback
            this.textContent = 'Added to Cart';
            setTimeout(() => {
                this.textContent = 'Add to Cart';
            }, 1000);
        });
    });
});
