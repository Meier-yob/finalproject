// Product data (stored in JS array)
const products = [
    { id: 1, name: 'iPhone 14', category: 'Phones', price: 999, image: 'https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-2up-starlight-220907-geo_inline.jpg.large.jpg', description: 'Latest iPhone with advanced features.' },
    { id: 2, name: 'Samsung Galaxy S23', category: 'Phones', price: 899, image: 'https://compasia.com.ph/cdn/shop/products/galaxy-s23-plus-942087_800x.jpg?v=1746108306', description: 'Powerful Android phone.' },
    { id: 3, name: 'MacBook Pro', category: 'Laptops', price: 1999, image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mbp14-spaceblack-select-202410_FMT_WHH?wid=892&hei=820&fmt=jpeg&qlt=90&.v=YnlWZDdpMFo0bUpJZnBpZjhKM2M3YnRLQTZRakorT3p3YTRUbVA0N3dnbm9kcmNoRkhVQjllNW44R3VXNVFLNm5EL1p1ZmpNaCtMcDhOa3lIZDhWbWhhU2ZYeWJNaHI5aXZSOWk3dEhoQkx6STlJSlZ4M0pKaFh6c2piamliR2k', description: 'High-performance laptop.' },
    { id: 4, name: 'Dell XPS 13', category: 'Laptops', price: 1299, image: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/hermano/verge/product/image/10098/236524_Dell_XPS_13_AKrales_0016.jpg?quality=90&strip=all&crop=16.666666666667%2C0%2C66.666666666667%2C100&w=2400', description: 'Ultra-portable laptop.' },
    { id: 5, name: 'AirPods Pro', category: 'Accessories', price: 249, image: 'https://powermaccenter.com/cdn/shop/files/AirPods_Pro_2nd_Gen_with_USB-C_PDP_Image_Position-1__global_1b33e4e0-6107-4ca3-acf7-4bba4f6eee60.jpg?v=1695907823', description: 'Wireless earbuds with noise cancellation.' },
    { id: 6, name: 'Wireless Charger', category: 'Accessories', price: 49, image: 'https://via.placeholder.com/250x150?text=Wireless+Charger', description: 'Fast wireless charging pad.' },
    { id: 7, name: 'Google Pixel 7', category: 'Phones', price: 799, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE6vuhndw8PO_nsHT8TedklxcYTR6y0VIvaw&s', description: 'Smartphone with great camera.' },
    { id: 8, name: 'HP Spectre', category: 'Laptops', price: 1499, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9LYwyoHWn8JYi6qUSfLq99yDN5dl3LC1oXw&s', description: 'Stylish and powerful laptop.' },
    { id: 9, name: 'Bluetooth Speaker', category: 'Accessories', price: 99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkzm330_QXVLpQJnT6jKW3ixSYYI9Vka9t6Q&s', description: 'Portable speaker with great sound.' },
    { id: 10, name: 'USB-C Hub', category: 'Accessories', price: 39, image: 'https://media.rs-online.com/Y2677820-01.jpg', description: 'Multi-port adapter.' },
    { id: 11, name: 'OnePlus 11', category: 'Phones', price: 699, image: 'https://oasis.opstatics.com/content/dam/oasis/page/2023/na/oneplus-11/specs/green-img.png', description: 'Fast and affordable phone.' },
    { id: 12, name: 'Lenovo ThinkPad', category: 'Laptops', price: 1199, image: 'https://m.media-amazon.com/images/I/61IRRQ2gWPL._AC_SL1280_.jpg', description: 'Reliable business laptop.' }
];

// Cart stored in localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elements
const featuredGrid = document.getElementById('featured-grid');
const productGrid = document.getElementById('product-grid');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const checkoutForm = document.getElementById('checkout-form');
const modal = document.getElementById('product-modal');
const modalDetails = document.getElementById('modal-details');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedProducts();
    renderProducts();
    updateCart();
    setupFilters();
});

// Render featured products (first 6)
function renderFeaturedProducts() {
    const featured = products.slice(0, 6);
    featuredGrid.innerHTML = featured.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Render all products
function renderProducts(filtered = products) {
    productGrid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="showProductDetails(${product.id})">View Details</button>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Show product details in modal
function showProductDetails(id) {
    const product = products.find(p => p.id === id);
    modalDetails.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="max-width: 100%;">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>$${product.price}</p>
        <input type="number" id="quantity" value="1" min="1">
        <button onclick="addToCart(${product.id}, parseInt(document.getElementById('quantity').value))">Add to Cart</button>
    `;
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
}

// Add to cart
function addToCart(id, qty = 1) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({ ...product, quantity: qty });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    closeModal();
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name} (x${item.quantity})</span>
            <span>$${item.price * item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `Total: $${total}`;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Remove from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Setup filters
function setupFilters() {
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
}

function filterProducts() {
    let filtered = products;
    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;

    if (search) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
    }
    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }
    if (priceRange) {
        const [min, max] = priceRange.split('-').map(v => v === '+' ? Infinity : parseInt(v));
        filtered = filtered.filter(p => p.price >= min && (max === Infinity || p.price <= max));
    }
    renderProducts(filtered);
}

// Show checkout
function showCheckout() {
    document.getElementById('cart').style.display = 'none';
    document.getElementById('checkout').style.display = 'block';
}

// Handle checkout form
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    document.getElementById('checkout').style.display = 'none';
    document.getElementById('cart').style.display = 'block';
});

// Scroll to section
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}