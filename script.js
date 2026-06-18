
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
    name: "Orange Asiatic Lily",
    price: 459,
    img: "Assets/orange-lily.jpg",
    tags: "bold vibrant birthday celebration cheerful under 500"
  },
  {
    id: 3,
    name: "Lavender Bundle",
    price: 349,
    img: "Assets/lavender.jpg",
    tags: "calming aromatic relaxation thank you under 500"
  },
  {
    id: 4,
    name: "Pink Calla Lily",
    price: 549,
    img: "Assets/pink-calla.jpg",
    tags: "elegant romantic anniversary sophisticated"
  },
  {
    id: 5,
    name: "Plum Calla Lily",
    price: 599,
    img: "Assets/dark-calla.jpg",
    tags: "premium luxury moody sophisticated gifting"
  },
  {
    id: 6,
    name: "Coral Tulip Pair",
    price: 429,
    img: "Assets/coral-tulip.jpg",
    tags: "spring cheerful birthday warm under 500"
  },
  {
    id: 7,
    name: "Yellow Freesia",
    price: 399,
    img: "Assets/yellow-freesia.jpg",
    tags: "cheerful bright spring birthday get well sunny under 500"
  },
  {
    id: 8,
    name: "Pink Anemone",
    price: 479,
    img: "Assets/pink-anemone.jpg",
    tags: "elegant delicate romantic single stem sophisticated"
  }
];

// thought about adding a "best seller" tag here at some point, never got to it
let cart = [];
let cartOpenCount = 0; // wanted to track how often people check the cart, never hooked this up

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

// flora ai chat logic starts here
const msgBox = document.getElementById("msgContainer");
const input = document.getElementById("userInput");

// this keeps track of the back and forth so Flora remembers context
const chatHistory = [];

// what Flora knows about us
const floraContext = `You are Flora, a warm and helpful assistant for Floral Charm — an elegant flower shop based in India.

Here are our available bouquets:
${items.map(i => `- ${i.name} (₹${i.price})`).join("\n")}

You help customers with:
- Picking the right bouquet based on occasion, person, or budget
- Writing heartfelt card messages that sound genuine — not like a template
- Answering questions about delivery (1–2 days, free above ₹999), returns (fresh flowers can't be returned but we replace damaged orders), and custom arrangements

How to talk: Be warm but not over the top. Write like a real person. Short sentences. No corporate language. Only recommend from the actual product list above — don't make things up.`;

// quick option buttons
document.querySelectorAll(".quick-options button").forEach(btn => {
  btn.addEventListener("click", () => {
    input.value = btn.dataset.msg;
    sendMessage();
  });
});

document.getElementById("sendMsg").addEventListener("click", sendMessage);

input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") sendMessage();
});

function addMessage(role, content) {
  const wrap = document.createElement("div");
  wrap.className = `msg ${role === "user" ? "me" : "flora"}`;
  wrap.innerHTML = `
    <div class="dot">${role === "user" ? "👤" : "🌸"}</div>
    <div class="text">${content}</div>
  `;
  msgBox.appendChild(wrap);
  msgBox.scrollTop = msgBox.scrollHeight;
}

function showTyping() {
  const wrap = document.createElement("div");
  wrap.className = 'msg flora';
  wrap.id = "typingMsg";
  wrap.innerHTML = `
    <div class="dot">🌸</div>
    <div class="typing-indicator"><span></span><span></span><span></span></div>
  `;
  msgBox.appendChild(wrap);
  msgBox.scrollTop = msgBox.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById("typingMsg");
  if (el) el.remove();
}

async function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  input.value = "";
  addMessage("user", userText);
  showTyping();

  chatHistory.push({ role: "user", content: userText });

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: floraContext,
        messages: chatHistory
      })
    });

    const data = await res.json();
    const reply = data.content?.map(b => b.text || "").join("") || "Something went wrong. Please try again.";

    chatHistory.push({ role: "assistant", content: reply });
    removeTyping();
    addMessage("flora", reply);

  } catch (err) {
    removeTyping();
    addMessage("flora", "Hmm, something went wrong on my end. Try again in a moment.");
    console.error("API error:", err);
  }
}
