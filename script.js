const items = [
  {
    id: 1,
    name: "Sweet Pea Bunch",
    price: 379,
    img: "Assets/sweet-pea.jpg",
    tags: "delicate spring pastel friendship under 500"
  },
  {
    id: 2,
    name: "Lily",
    price: 459,
    img: "Assets/lily.jpg",
  },
  {
    id: 3,
    name: "Lavender Bundle",
    price: 349,
    img: "Assets/lavender.jpg",
  },
  {
    id: 4,
    name: "Pink Calla Lily",
    price: 549,
    img: "Assets/pink-calla.jpg",
  },
  {
    id: 5,
    name: "Pink Mangolia",
    price: 599,
    img: "Assets/pink-mangolia.jpg",
  },
  {
    id: 6,
    name: "Pink Poppies",
    price: 429,
    img: "Assets/pink-poppies.jpg",
  },
  {
    id: 7,
    name: "Yellow Freesia",
    price: 399,
    img:"Assets/yellow-freesia.jpg"
  },
  {
    id: 8,
    name: "Pink Anemone",
    price: 479,
    img: "Assets/pink-anemone.jpg",
  }
];
let cart = [];
const grid = document.getElementById("productGrid");

items.forEach(item => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="card-img">
      <img src="${item.img}" alt="${item.name}" loading="lazy" />
    </div>
    <div class="card-info">
      <h3>${item.name}</h3>
      <div class="card-bottom">
        <span class="price">₹${item.price}</span>
        <button onclick="addToCart(${item.id})">Add to cart</button>
      </div>
    </div>
  `;
  grid.appendChild(card);
});

function addToCart(id) {
  const found = items.find(i => i.id === id);
  if (!found) return;
  cart.push(found);
  document.getElementById("cartCount").textContent = cart.length;
}

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);

// close if clicking the dark bg behind the panel
document.getElementById("cartBg").addEventListener("click", function(e) {
  if (e.target === this) closeCart();
});

function openCart() {
  const bg = document.getElementById("cartBg");
  const list = document.getElementById("cartItems");
  bg.classList.add("open");
  list.innerHTML = "";

  if (cart.length === 0) {
    list.innerHTML = '<p class="empty-msg">Nothing in your cart yet.</p>';
    document.getElementById("cartTotal").textContent = "0";
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `<span>${item.name}</span><span>₹${item.price}</span>`;
    list.appendChild(row);
  });

  document.getElementById("cartTotal").textContent = total;
}

function closeCart() {
  document.getElementById("cartBg").classList.remove("open");
}

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  this.reset();
  alert("Got it! We'll get back to you within 24 hours.");
});
