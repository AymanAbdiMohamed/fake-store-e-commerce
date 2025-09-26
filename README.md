
# FakeStore E-Commerce Web App

## Overview
FakeStore is a simple e-commerce web application built using **HTML**, **CSS**, and **JavaScript**.  
It simulates a real online shopping experience by fetching products dynamically from the [Fake Store API](https://fakestoreapi.com/), displaying them in a product list, and allowing users to add products to a shopping cart, remove them, and checkout.

---

## Features
- **Dynamic Product Loading**: Fetches product data from the Fake Store API.  
- **Product Display**: Products shown as interactive cards with image, title, price, and "Add to Cart" button.  
- **Shopping Cart**: Displays added products, allows removal, and calculates total price.  
- **Checkout**: Clears the cart and displays a thank-you message.  
- **Error Handling**: Shows a loading message and handles API failures gracefully.  

---

## Technologies Used
- **HTML** — Structure of the web page.  
- **CSS** — Styling, layout, and responsiveness.  
- **JavaScript** — Dynamic rendering, API interaction, event handling, and cart functionality.  

---

## Project Structure
/FakeStore
│
├── index.html # Main HTML structure
├── style.css # Styling
├── script.js # JavaScript logic
└── README.md # Project documentation


---

## How It Works
1. The page loads and displays a loading message.  
2. JavaScript fetches products from the Fake Store API.  
3. Products are rendered dynamically in the `#product-list` section.  
4. Users click "Add to Cart" to add items.  
5. The cart updates with the selected items and total price.  
6. Users can remove items or click "Checkout" to complete the purchase.  

---

## Usage
1. Clone the repository:
   git clone https://github.com/your-username/FakeStore.git

Open index.html in a web browser.
Browse products and interact with the cart.

License:
This project is not licensed.



