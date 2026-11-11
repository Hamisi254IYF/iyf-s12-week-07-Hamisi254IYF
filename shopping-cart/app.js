// shopping-cart/app.js
const STORAGE_KEY = "cart";

const state = {
    products: [
        { id: 1, name: "Laptop", price: 999, image: "https://via.placeholder.com/150" },
        { id: 2, name: "Phone", price: 699, image: "https://via.placeholder.com/150" },
        { id: 3, name: "Headphones", price: 199, image: "https://via.placeholder.com/150" }
    ],
    cart: []
};

// Persistence
function saveCart() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart)); }
function loadCart() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) state.cart = JSON.parse(saved);
}

// Cart operations
function addToCart(productId) {
    const existing = state.cart.find(item => item.productId === productId);
    if (existing) existing.quantity++;
    else state.cart.push({ productId, quantity: 1 });
    saveCart();
    renderCart();
}

function updateQuantity(productId, quantity) {
    if (quantity <= 0) return removeFromCart(productId);
    const item = state.cart.find(i => i.productId === productId);
    if (item) { item.quantity = quantity; saveCart(); renderCart(); }
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(i => i.productId !== productId);
    saveCart();
    renderCart();
}

function clearCart() {
    state.cart = [];
    saveCart();
    renderCart();
}

function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find(p => p.id === item.productId);
        return total + product.price * item.quantity;
    }, 0);
}

function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}

// Rendering (complete this)
function renderProducts() { /* build product cards with "Add to Cart" buttons */ }
function renderCart() { /* render cart items, totals, count badge */ }

loadCart();
renderProducts();
renderCart();