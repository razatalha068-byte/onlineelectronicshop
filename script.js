
const products = [
    {id: 1, name: "Wireless Headphones", price: 4500, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"},
    {id: 2, name: "Smart Watch", price: 6500, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"},
    {id: 3, name: "Digital Camera", price: 18500, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"},
    {id: 4, name: "Bluetooth Speaker", price: 3500, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"},
    {id: 5, name: "Laptop", price: 95000, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"},
    {id: 6, name: "Smartphone", price: 55000, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"}
];

let cart = JSON.parse(localStorage.getItem("electroCart") || "[]");

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    if (pageId === "cart") renderCart();

    window.scrollTo(0, 0);
}

function displayProducts(list, elementId) {
    const container = document.getElementById(elementId);

    if (!container) return;

    container.innerHTML = list.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <h4>Rs. ${product.price.toLocaleString("en-PK")}</h4>
            <button onclick="addToCart(${product.id})">Add to Cart 🛒</button>
        </div>
    `).join("");
}

function addToCart(id) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({id: id, quantity: 1});
    }

    saveCart();
    updateCount();
    alert("Product added to cart!");
}

function saveCart() {
    localStorage.setItem("electroCart", JSON.stringify(cart));
}

function updateCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").textContent = count;
}

function renderCart() {
    const container = document.getElementById("cart-items");
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<h3>Your cart is empty!</h3>";
        document.getElementById("total").textContent = "0";
        return;
    }

    container.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return "";

        const subtotal = product.price * item.quantity;
        total += subtotal;

        return `
            <div class="cart-item">
                <div>
                    <h3>${product.name}</h3>
                    <p>Rs. ${product.price.toLocaleString("en-PK")} × ${item.quantity}</p>
                </div>
                <div>
                    <button onclick="changeQuantity(${item.id}, -1)">−</button>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button onclick="removeItem(${item.id})">Remove</button>
                </div>
            </div>
        `;
    }).join("");

    document.getElementById("total").textContent = total.toLocaleString("en-PK");
}

function changeQuantity(id, amount) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    saveCart();
    updateCount();
    renderCart();
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCount();
    renderCart();
}

function searchProducts() {
    const value = document.getElementById("search").value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value)
    );

    displayProducts(filtered, "shop-products");
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("This is a demo checkout. No real payment will be processed.");
}

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thank you! Your message has been received.");
    this.reset();
});

displayProducts(products.slice(0, 3), "home-products");
displayProducts(products, "shop-products");
updateCount();
