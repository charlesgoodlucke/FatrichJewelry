// Product Database Setup
const PRODUCTS = [
  {
    id: "silver-rope-chain",
    name: "Italian Silver Rope Chain",
    category: "silver",
    price: 140,
    image: "/assets/images/silver_necklace.png",
    description: "A classic Italian rope chain meticulously crafted with diamond-cut links for a stunning reflective glow. Perfect for wearing solo or layering.",
    badge: "Best Seller",
    specs: [
      "Material: 925 Sterling Silver",
      "Plating: Premium Rhodium",
      "Length: 22 inches",
      "Width: 4mm",
      "Weight: 24.5 grams",
      "Origin: Vicenza, Italy"
    ]
  },
  {
    id: "gold-figaro-bracelet",
    name: "Gold Figaro Bracelet",
    category: "gold",
    price: 650,
    image: "/assets/images/gold_ring.png", // using high res gold ring/jewelry image
    description: "A sophisticated link bracelet featuring the classic 3+1 Figaro pattern. Engineered with a secure lobster clasp and polished to a mirror finish.",
    badge: "Italian Craft",
    specs: [
      "Material: 18K Yellow Gold",
      "Purity: 75% Pure Gold",
      "Length: 8.5 inches",
      "Width: 6mm",
      "Weight: 12.8 grams",
      "Origin: Arezzo, Italy"
    ]
  },
  {
    id: "diamond-solitaire-ring",
    name: "Diamond Solitaire Ring",
    category: "diamonds",
    price: 2800,
    image: "/assets/images/bridal_set.png", // using high res bridal/diamond ring image
    description: "A breathtaking round-cut diamond solitaire set in a minimalist four-prong white gold band. A timeless symbol of elegance and commitment.",
    badge: "GIA Certified",
    specs: [
      "Center Stone: 1.05 Carat",
      "Color Grade: F (Colorless)",
      "Clarity Grade: VS1",
      "Cut Grade: Excellent",
      "Band: 18K White Gold",
      "Certification: GIA Certificate"
    ]
  },
  {
    id: "gold-diamond-chronograph",
    name: "Gold & Diamond Chronograph",
    category: "watches",
    price: 1250,
    image: "/assets/images/luxury_watch.png", // using gold/diamond watch
    description: "A luxurious timepiece with a diamond-encrusted bezel and a stunning gold dial. Equipped with a Swiss quartz movement and sapphire crystal glass.",
    badge: "Limited Edition",
    specs: [
      "Case Size: 41mm",
      "Bezel: VVS Lab-Diamonds",
      "Movement: Swiss Quartz Chrono",
      "Glass: Scratch-Resistant Sapphire",
      "Water Resistance: 50 Meters",
      "Strap: 18K Gold Plated Steel"
    ]
  },
  {
    id: "silver-tennis-bracelet",
    name: "Silver Tennis Bracelet",
    category: "silver",
    price: 220,
    image: "/assets/images/silver_bracelet.png", // using silver bracelet
    description: "A dazzling row of round-cut lab-created stones in a flexible, premium sterling silver setting. Secured with a dual-latch clasp for guaranteed safety.",
    badge: "Popular",
    specs: [
      "Material: 925 Sterling Silver",
      "Stones: AAAAA Cubic Zirconia",
      "Stone Cut: Round Brilliant (3mm)",
      "Length: 7.25 inches",
      "Weight: 18.2 grams",
      "Lock: Double-Safety Latch"
    ]
  },
  {
    id: "gold-mesh-choker",
    name: "Premium 21K Gold Choker",
    category: "gold",
    price: 1850,
    image: "/assets/images/gold_choker.png", // using gold mesh choker
    description: "An intricate mesh choker necklace, handcrafted in Dubai. Features traditional filigree work with a high-polish, radiant yellow gold finish.",
    badge: "Dubai Special",
    specs: [
      "Material: 21K Dubai Gold",
      "Purity: 87.5% Pure Gold",
      "Width: 15mm",
      "Length: 16 inches (Adjustable)",
      "Weight: 28.6 grams",
      "Collection: Dubai Heritage"
    ]
  },
  {
    id: "royal-bridal-set",
    name: "Royal Diamond Bridal Set",
    category: "diamonds",
    price: 4500,
    image: "/assets/images/bridal_set.png", // using bridal ring set
    description: "A magnificent duo consisting of a cushion-cut halo engagement ring and a matching pavé diamond wedding band. Crafted to lock together seamlessly.",
    badge: "Royal Collection",
    specs: [
      "Total Weight: 2.25 Carat",
      "Center Stone: 1.5 Carat Cushion",
      "Clarity: VVS1",
      "Band Material: Platinum 950",
      "Design: Cushion Halo Pavé",
      "Prongs: Platinum 4-Prong Set"
    ]
  },
  {
    id: "sports-oyster-watch",
    name: "Sleek Silver Oyster Watch",
    category: "watches",
    price: 850,
    image: "/assets/images/sports_watch.png", // using blue-face silver oyster watch
    description: "A minimalist automatic watch featuring a deep sunburst blue dial and a classic three-link oyster bracelet. Powered by a precision automatic movement.",
    badge: "New Arrival",
    specs: [
      "Case Size: 39mm",
      "Movement: NH35 Automatic",
      "Dial: Sunburst Blue",
      "Glass: Sapphire Crystal",
      "Power Reserve: 41 Hours",
      "Strap: 316L Stainless Steel"
    ]
  }
];

// App State Management
let cart = [];
let currentFilter = "all";
let currentSearch = "";
let currentSort = "featured";
let activeModalProduct = null;
let activeModalQty = 1;

// WhatsApp Shop Configuration
const WHATSAPP_PHONE = "971525863460"; // Placeholder Dubai WhatsApp phone number

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  initCart();
  renderCatalog();
  setupEventListeners();
  setupScrollReveal();

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// Load Cart from LocalStorage
function initCart() {
  const savedCart = localStorage.getItem("fatrich_jewelry_cart");
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
      updateCartUI();
    } catch (e) {
      cart = [];
    }
  }
}

// Save Cart to LocalStorage
function saveCart() {
  localStorage.setItem("fatrich_jewelry_cart", JSON.stringify(cart));
  updateCartUI();
}

// Render Products Catalog Grid
function renderCatalog() {
  const grid = document.getElementById("catalog-products-grid");
  if (!grid) return;

  // Filter products
  let filtered = PRODUCTS.filter(product => {
    const matchesCategory = currentFilter === "all" || product.category === currentFilter;
    const matchesSearch = product.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
      product.category.toLowerCase().includes(currentSearch.toLowerCase()) ||
      product.description.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  if (currentSort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    // Default / Featured: maintain database order
    filtered.sort((a, b) => {
      const idxA = PRODUCTS.findIndex(p => p.id === a.id);
      const idxB = PRODUCTS.findIndex(p => p.id === b.id);
      return idxA - idxB;
    });
  }

  // Update search count/summary banner
  const summaryBanner = document.getElementById("active-results-summary");
  const summaryCount = document.getElementById("summary-count");
  const summaryText = document.getElementById("summary-text");

  if (currentSearch.trim() !== "") {
    summaryBanner.classList.remove("hidden-summary");
    summaryCount.textContent = filtered.length;
    summaryText.textContent = currentSearch;
  } else {
    summaryBanner.classList.add("hidden-summary");
  }

  // If no products match
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results-box" style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: var(--text-secondary);">
        <i data-lucide="info" style="width: 3rem; height: 3rem; margin-bottom: 1rem; color: var(--border-glass);"></i>
        <h3 style="font-weight: 400; margin-bottom: 0.5rem; text-transform: uppercase;">No Creations Found</h3>
        <p>Try clearing your search or choosing another collection tab.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  // Render cards
  grid.innerHTML = filtered.map(product => {
    return `
      <div class="product-card" id="card-${product.id}">
        <div class="product-img-wrapper" onclick="openDetailsModal('${product.id}')" style="cursor: pointer;">
          ${product.badge ? `<span class="product-card-badge">${product.badge}</span>` : ''}
          <img src="${product.image}" alt="${product.name}">
          <div class="product-card-actions">
            <button class="product-action-btn" onclick="event.stopPropagation(); openDetailsModal('${product.id}')">
              <i data-lucide="eye"></i> View Details
            </button>
            <button class="product-action-btn" onclick="event.stopPropagation(); addToCart('${product.id}', 1)">
              <i data-lucide="shopping-bag"></i> Add
            </button>
          </div>
        </div>
        <div class="product-card-details">
          <span class="product-category-tag">${product.category === 'silver' ? 'Italian Silver 925' : product.category === 'gold' ? 'Dubai Gold' : product.category}</span>
          <h3 class="product-name-title" onclick="openDetailsModal('${product.id}')">${product.name}</h3>
          <div class="product-price-row">
            <span class="product-price">$${product.price.toLocaleString()}</span>
            <button class="quick-add-btn" onclick="addToCart('${product.id}', 1)" aria-label="Add to cart">
              <i data-lucide="plus"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Shopping Cart Core Logic
window.addToCart = function (productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      qty: quantity
    });
  }

  saveCart();
  showToast(`Added ${quantity} x ${product.name} to Cart`);
};

window.removeFromCart = function (productId) {
  const item = cart.find(i => i.id === productId);
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  if (item) {
    showToast(`Removed ${item.name} from Cart`);
  }
};

window.updateCartQty = function (productId, newQty) {
  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty = newQty;
    saveCart();
  }
};

// Render Cart UI Drawer
function updateCartUI() {
  // Update header badges
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("cart-count-badge");
  if (badge) {
    badge.textContent = count;
    if (count > 0) {
      badge.style.display = "flex";
    } else {
      badge.style.display = "none";
    }
  }

  const itemsContainer = document.getElementById("cart-items-container");
  const summaryFooter = document.getElementById("cart-summary-footer");
  if (!itemsContainer || !summaryFooter) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="empty-cart-state">
        <i data-lucide="shopping-bag" class="empty-cart-icon"></i>
        <p>Your jewelry cart is empty.</p>
        <button class="btn btn-secondary btn-sm" onclick="toggleCartDrawer(false)">Start Browsing</button>
      </div>
    `;
    summaryFooter.style.display = "none";
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  summaryFooter.style.display = "block";
  let subtotal = 0;

  itemsContainer.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div>
            <div class="cart-item-category">${item.category === 'silver' ? 'Sterling Silver 925' : item.category}</div>
            <h4 class="cart-item-name">${item.name}</h4>
          </div>
          <div class="cart-item-interaction">
            <div class="qty-controls">
              <button class="qty-btn" onclick="updateCartQty('${item.id}', ${item.qty - 1})"><i data-lucide="minus"></i></button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="updateCartQty('${item.id}', ${item.qty + 1})"><i data-lucide="plus"></i></button>
            </div>
            <button class="cart-remove-btn" onclick="removeFromCart('${item.id}')">
              <i data-lucide="trash-2"></i> Remove
            </button>
          </div>
        </div>
        <div class="cart-item-price">$${itemTotal.toLocaleString()}</div>
      </div>
    `;
  }).join('');

  document.getElementById("cart-subtotal-price").textContent = `$${subtotal.toLocaleString()}`;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Toggle Cart Drawer
function toggleCartDrawer(open) {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-drawer-overlay");

  if (open) {
    drawer.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden"; // disable body scrolling
  } else {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = ""; // enable scrolling
  }
}

// Toggle Mobile Nav Menu
function toggleMobileMenu(open) {
  const drawer = document.getElementById("mobile-nav-panel");
  if (open) {
    drawer.classList.add("open");
  } else {
    drawer.classList.remove("open");
  }
}

// Details Modal Core Logic
window.openDetailsModal = function (productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  activeModalProduct = product;
  activeModalQty = 1;

  document.getElementById("modal-product-img").src = product.image;
  document.getElementById("modal-product-img").alt = product.name;

  const categoryLabel = product.category === 'silver' ? 'Italian Silver 925' : product.category === 'gold' ? 'Pure Dubai Gold' : product.category;
  document.getElementById("modal-product-tag").textContent = categoryLabel;

  document.getElementById("modal-product-title").textContent = product.name;
  document.getElementById("modal-product-price").textContent = `$${product.price.toLocaleString()}`;
  document.getElementById("modal-product-description").textContent = product.description;
  document.getElementById("modal-qty-val").textContent = activeModalQty;

  const specsList = document.getElementById("modal-product-specs");
  specsList.innerHTML = product.specs.map(spec => `<li>${spec}</li>`).join('');

  const modal = document.getElementById("product-detail-modal");
  modal.classList.add("open");
  document.body.style.overflow = "hidden";

  if (window.lucide) {
    window.lucide.createIcons();
  }
};

function closeDetailsModal() {
  const modal = document.getElementById("product-detail-modal");
  modal.classList.remove("open");
  if (!document.getElementById("cart-drawer").classList.contains("open")) {
    document.body.style.overflow = "";
  }
  activeModalProduct = null;
}

// Modal Quantity Picker Controls
function adjustModalQty(change) {
  activeModalQty = Math.max(1, activeModalQty + change);
  document.getElementById("modal-qty-val").textContent = activeModalQty;
}

// Event Listeners setup
function setupEventListeners() {
  // Sticky Navbar Scroll effect
  window.addEventListener("scroll", () => {
    const header = document.getElementById("main-header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Drawer / Modal Toggles
  document.getElementById("cart-toggle-btn").addEventListener("click", () => toggleCartDrawer(true));
  document.getElementById("cart-drawer-close").addEventListener("click", () => toggleCartDrawer(false));
  document.getElementById("cart-drawer-overlay").addEventListener("click", () => toggleCartDrawer(false));

  document.getElementById("mobile-menu-btn").addEventListener("click", () => toggleMobileMenu(true));
  document.getElementById("mobile-menu-close").addEventListener("click", () => toggleMobileMenu(false));

  document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => toggleMobileMenu(false));
  });

  // Logo trigger home navigation
  document.getElementById("brand-logo-trigger").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Modal actions
  document.getElementById("modal-close-btn").addEventListener("click", closeDetailsModal);
  document.getElementById("product-detail-modal").addEventListener("click", (e) => {
    if (e.target.id === "product-detail-modal") closeDetailsModal();
  });

  document.getElementById("modal-qty-minus").addEventListener("click", () => adjustModalQty(-1));
  document.getElementById("modal-qty-plus").addEventListener("click", () => adjustModalQty(1));

  document.getElementById("modal-add-to-cart-btn").addEventListener("click", () => {
    if (activeModalProduct) {
      addToCart(activeModalProduct.id, activeModalQty);
      closeDetailsModal();
    }
  });

  document.getElementById("modal-whatsapp-inquire-btn").addEventListener("click", () => {
    if (activeModalProduct) {
      const msg = `Hello Fatimah Jewellery, I am interested in purchasing: ${activeModalProduct.name} (Qty: ${activeModalQty}) - $${(activeModalProduct.price * activeModalQty).toLocaleString()}. Please send details.`;
      const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank");
    }
  });

  // Search Toggle panel behavior
  const searchToggle = document.getElementById("search-toggle-btn");
  const searchPanel = document.getElementById("search-dropdown-panel");
  const searchInput = document.getElementById("catalog-search-input");
  const searchClear = document.getElementById("search-clear-btn");

  searchToggle.addEventListener("click", () => {
    searchPanel.classList.toggle("hidden-panel");
    if (!searchPanel.classList.contains("hidden-panel")) {
      searchInput.focus();
    }
  });

  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderCatalog();
  });

  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    currentSearch = "";
    renderCatalog();
  });

  // Category selection pill triggers
  const pillsArea = document.getElementById("filter-pills-area");
  if (pillsArea) {
    pillsArea.addEventListener("click", (e) => {
      const button = e.target.closest(".filter-pill");
      if (!button) return;

      document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
      button.classList.add("active");

      currentFilter = button.dataset.filter;
      renderCatalog();
    });
  }

  // Sort select selector trigger
  const sortSelect = document.getElementById("catalog-sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderCatalog();
    });
  }

  // Collections Card shortcuts (filters shop catalog directly)
  document.querySelectorAll(".collection-card").forEach(card => {
    card.addEventListener("click", () => {
      const category = card.dataset.category;

      // Update filter pills active class
      document.querySelectorAll(".filter-pill").forEach(p => {
        if (p.dataset.filter === category) {
          p.classList.add("active");
        } else {
          p.classList.remove("active");
        }
      });

      currentFilter = category;
      renderCatalog();

      // Scroll smoothly to shop section
      document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Footer collections link triggers
  document.querySelectorAll(".category-footer-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const filterValue = link.dataset.filter;

      // Update pills
      document.querySelectorAll(".filter-pill").forEach(p => {
        if (p.dataset.filter === filterValue) {
          p.classList.add("active");
        } else {
          p.classList.remove("active");
        }
      });

      currentFilter = filterValue;
      renderCatalog();
      document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Cart Drawer Checkout Action Buttons
  document.getElementById("checkout-whatsapp-btn").addEventListener("click", () => {
    if (cart.length === 0) return;

    let total = 0;
    let itemsText = "";
    cart.forEach((item, idx) => {
      const itemCost = item.price * item.qty;
      total += itemCost;
      itemsText += `${idx + 1}. ${item.name} (Qty: ${item.qty}) - $${itemCost.toLocaleString()}\n`;
    });

    const finalMsg = `Hello Fatimah Jewellery, I would like to place an order on your store:\n\n${itemsText}\nSubtotal: $${total.toLocaleString()}\n\nPlease verify shipping details and total invoice details for checkout. Thank you!`;
    const encoded = encodeURIComponent(finalMsg);
    const checkoutUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;

    window.open(checkoutUrl, "_blank");
    showToast("Checkout string generated! Redirecting to WhatsApp...");
  });

  document.getElementById("checkout-direct-btn").addEventListener("click", () => {
    if (cart.length === 0) return;

    // Simulate standard inquiry checkout invoice
    showToast("Preparing order invoice inquiry...");
    setTimeout(() => {
      cart = [];
      saveCart();
      toggleCartDrawer(false);

      // Open modal-like notification
      alert("Inquiry Invoice Sent! Our team will contact you shortly to complete payment and shipping details.");
    }, 1000);
  });

  // Footer Navigation updates Active state on click
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      document.querySelectorAll(".nav-link").forEach(nl => nl.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Inquiry Form Submissions
  const inquiryForm = document.getElementById("jewelry-inquiry-form");
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("form-name").value;
      const phone = document.getElementById("form-phone").value;
      const type = document.getElementById("form-type").value;
      const message = document.getElementById("form-message").value;

      showToast("Submitting your inquiry request...");

      // Simulate API submit delay
      setTimeout(() => {
        inquiryForm.reset();

        // Generate WhatsApp text for inquiry form too!
        const requestText = `Hello Fatimah Jewellery, I am requesting a consultation:\n\nName: ${name}\nWhatsApp: ${phone}\nInquiry Type: ${type}\nRequirements: ${message}`;
        const encoded = encodeURIComponent(requestText);
        const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;

        // Offer redirect
        if (confirm("Inquiry recorded! Would you like to send this inquiry directly to WhatsApp to accelerate consultation?")) {
          window.open(waUrl, "_blank");
        } else {
          alert("Thank you! Your inquiry has been submitted and saved. We will contact you via WhatsApp shortly.");
        }
      }, 1200);
    });
  }
}

// Toast Alert Manager
function showToast(message) {
  const hub = document.getElementById("toast-notification-hub");
  if (!hub) return;

  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.innerHTML = `
    <i data-lucide="check-circle" class="toast-icon"></i>
    <span class="toast-text">${message}</span>
  `;

  hub.appendChild(toast);
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Animate Entrance
  setTimeout(() => {
    toast.classList.add("show");
  }, 50);

  // Auto clean up toast
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4000);
}

// Scroll Reveal Observer Setup
function setupScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target); // Reveal only once
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if not supported
    revealElements.forEach(el => el.classList.add("revealed"));
  }
}
