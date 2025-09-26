// URL of the fake store API
// This is the endpoint we will use to fetch product data
// fakestoreapi.com is a public API that returns dummy e-commerce products information
const API_URL = 'https://fakestoreapi.com/products';

// Fetch products from API
// This is an asynchronous fucntion that retries the prouct data from the API
// It returns a promise that resolves to an array of product objects, so we can use await inside the asunc function
async function fetchProducts() {
  try {
    // fetch data from the API_URL
    // `fetch` sends a HTTP GET request and returns a promise that resolves to the response object
    // we check if the response is ok (status code 200-299)
    const resp = await fetch(API_URL);

    // if the response was successful, we parse the JSON body of the response
    if (!resp.ok) {
      // if the response was not successful, we throw an error
      throw new Error(`HTTP error! status: ${resp.status}`);
    }
    // parse the response body as JSON and store it in the products variable
    const products = await resp.json();
    // return the array of products so it can be used elsewhere
    return products;
  } catch (err) {
    // handle errors that may occur during the fetch operation using the below
    console.error('Error fetching products:', err);
    // return an empty array so the rest of the code doenst break
    return [];
  }
}

// Render products into the page
// this function takes an array of products and dislpays them in the html page
// it creates a card for each product and appends it to the product list container
function renderProducts(products) {
  // get the container element where products will be displayed
  const listEl = document.getElementById('product-list');

  // clear any existing content before rendering new products
  listEl.innerHTML = '';


  // loop over each product in the products array
  products.forEach(product => {
    // create a nw div element for the product card
    const card = document.createElement('div');
    // assign a css class for the sytling
    card.className = 'product-card';

    // set the html inside the card
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <div class="product-details">
        <h3>${product.title}</h3>
        <div class="price">$${product.price.toFixed(2)}</div>
        <button data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    // append the product card to the container element
    listEl.appendChild(card);
  });
}

// On page load
// this event listener waits for the DOM to fully load before running the code
document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  renderProducts(products);
});
