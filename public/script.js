// =============================
// URL for Fake Store API
// =============================
const API_URL = 'https://fakestoreapi.com/products';

// =============================
// Variables to store cart and products
// =============================
let cart = [];      // Stores items added to the cart
let products = [];  // Stores all products fetched from API

// =============================
// Fetch products from Fake Store API
// =============================
async function fetchProducts() {
  try {
    const resp = await fetch(API_URL); // Send GET request to API

    // Check if the response is OK (status 200-299)
    if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);

    const data = await resp.json(); // Convert response to JSON
    return data;                     // Return fetched product data

  } catch (err) {
    console.error('Error fetching products:', err);

    // Show error message to the user
    document.getElementById('messages').innerHTML =
      "<p style='color:red;'>Failed to load products.</p>";

    return []; // Return empty array if fetching fails
  }
}

// =============================
// Render products to the product list section
// =============================
function renderProducts(products) {
  const listEl = document.getElementById('product-list');
  listEl.innerHTML = ''; // Clear product list before rendering

  // Loop through each product and create its HTML card
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card'; // Apply styling

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <div class="product-details">
        <h3>${product.title}</h3>
        <div class="price">$${product.price.toFixed(2)}</div>
        <button data-id="${product.id}">Add to Cart</button>
      </div>
    `;

    listEl.appendChild(card); // Add card to product list
  });
}

// =============================
// Add product to cart
// =============================
function addToCart(productId) {
  // Find the product by ID from the loaded products
  const product = products.find(p => p.id == productId);

  if (product) {
    cart.push(product); // Add product to cart array
    renderCart();       // Update cart UI
  }
}

// =============================
// Render cart items
// =============================
function renderCart() {
  const cartItemsEl = document.getElementById('cart-items'); // Cart items container
  const totalPriceEl = document.getElementById('total-price'); // Total price element
  const emptyMsgEl = document.querySelector('#cart p'); // "Your cart is empty" message

  cartItemsEl.innerHTML = ''; // Clear previous cart items

  // If cart is empty
  if (cart.length === 0) {
    emptyMsgEl.style.display = 'block'; // Show empty cart message
    totalPriceEl.innerText = '';        // Clear total price
    return;
  }

  emptyMsgEl.style.display = 'none'; // Hide empty cart message

  // Loop through cart items and render each
  cart.forEach((product, index) => {
    const li = document.createElement('li');
    li.className = 'cart-item';

    li.innerHTML = `
      ${product.title} - $${product.price.toFixed(2)}
      <button onclick="removeFromCart(${index})">Remove</button>
    `;

    cartItemsEl.appendChild(li); // Add cart item to list
  });

  // Calculate total price of cart items
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  totalPriceEl.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}

// =============================
// Remove item from cart
// =============================
function removeFromCart(index) {
  cart.splice(index, 1); // Remove product from cart by index
  renderCart();          // Update cart UI
}

// =============================
// Initialization on page load
// =============================
document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('messages').innerHTML = "Loading products..."; // Show loading message

  products = await fetchProducts(); // Fetch products from API
  renderProducts(products);         // Render products in UI
  renderCart();                     // Render cart (empty initially)
});

// =============================
// Add to cart button click handler
// =============================
document.addEventListener('click', (e) => {
  // Check if clicked element is a button with a data-id attribute
  if (e.target.tagName === 'BUTTON' && e.target.dataset.id) {
    addToCart(e.target.dataset.id); // Add product to cart
  }
});

// =============================
// Checkout button functionality
// =============================
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Your cart is empty!"); // Alert if cart is empty
  } else {
    alert("Thank you for your purchase!"); // Confirm purchase
    cart = [];                             // Clear cart
    renderCart();                          // Update cart UI
  }
});