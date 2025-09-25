// URL of the fake store API
const API_URL = 'https://fakestoreapi.com/products';

// Fetch products from API
async function fetchProducts() {
  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    const products = await resp.json();
    return products;
  } catch (err) {
    console.error('Error fetching products:', err);
    return [];
  }
}

// Render products into the page
function renderProducts(products) {
  const listEl = document.getElementById('product-list');
  listEl.innerHTML = '';  // clear

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <div class="product-details">
        <h3>${product.title}</h3>
        <div class="price">$${product.price.toFixed(2)}</div>
        <button data-id="${product.id}">Add to Cart</button>
      </div>
    `;

    listEl.appendChild(card);
  });
}

// On page load
document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  renderProducts(products);
});
