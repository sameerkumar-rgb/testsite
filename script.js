// Uzera Tracking Implementation
let currentUser = null;

// Initialize tracking when page loads
document.addEventListener("DOMContentLoaded", function () {
  console.log("Uzera tracking initialized");

  // Track page view
  trackPageView();

  // Set up event listeners
  setupEventListeners();

  // Check if user is already logged in (for demo purposes)
  checkExistingUser();
});

// Track page view
function trackPageView() {
  uzera("track", {
    event: "Page View",
    data: {
      page_title: document.title,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
    },
  });
  console.log("Page view tracked");
}

// Set up all event listeners
function setupEventListeners() {
  // Login button
  document.getElementById("loginBtn").addEventListener("click", function () {
    document.getElementById("loginModal").style.display = "block";
    trackEvent("Login Modal Opened");
  });

  // Signup button
  document.getElementById("signupBtn").addEventListener("click", function () {
    document.getElementById("signupModal").style.display = "block";
    trackEvent("Signup Modal Opened");
  });

  // Close modals
  document.querySelectorAll(".close").forEach(function (closeBtn) {
    closeBtn.addEventListener("click", function () {
      this.closest(".modal").style.display = "none";
    });
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none";
    }
  });

  // Login form submission
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    handleLogin();
  });

  // Signup form submission
  document
    .getElementById("signupForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      handleSignup();
    });

  // Product buy buttons
  document.querySelectorAll(".buy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const productCard = this.closest(".product-card");
      const productId = productCard.dataset.productId;
      const productName = productCard.querySelector("h3").textContent;
      const productPrice = productCard.querySelector(".price").textContent;
      const productCategory =
        productCard.querySelector(".category").textContent;

      trackPurchase(productId, productName, productPrice, productCategory);
    });
  });

  // Product card hover (view tracking)
  document.querySelectorAll(".product-card").forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      const productId = this.dataset.productId;
      const productName = this.querySelector("h3").textContent;
      trackProductView(productId, productName);
    });
  });

  // Contact form submission
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      handleContactForm();
    });

  // Navigation tracking
  document.querySelectorAll("nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      trackEvent("Navigation Click", {
        link_text: this.textContent,
        link_href: this.getAttribute("href"),
      });
    });
  });
}

// Handle login
function handleLogin() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Simulate login (in real app, this would be an API call)
  if (email && password) {
    // Create user object
    currentUser = {
      id: generateUserId(email),
      email: email,
      name: email.split("@")[0], // Simple name extraction
      join_date: new Date().toISOString(),
      plan: "Basic",
      role: "User",
    };

    // Identify user with Uzera
    identifyUser(currentUser);

    // Track login event
    trackEvent("User Login", {
      email: email,
      login_method: "email",
    });

    // Close modal and update UI
    document.getElementById("loginModal").style.display = "none";
    updateUIForLoggedInUser();

    console.log("User logged in:", currentUser);
  }
}

// Handle signup
function handleSignup() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const plan = document.getElementById("signupPlan").value;
  const company = document.getElementById("signupCompany").value;

  if (name && email && password && plan) {
    // Create user object
    currentUser = {
      id: generateUserId(email),
      name: name,
      email: email,
      join_date: new Date().toISOString(),
      plan: plan,
      role: "User",
      company_name: company || null,
      account_id: generateAccountId(),
      product_name: user.product_name || "Fatima product",
    };

    // Identify user with Uzera
    identifyUser(currentUser);

    // Track signup event
    trackEvent("User Signup", {
      email: email,
      plan: plan,
      company: company,
    });

    // Close modal and update UI
    document.getElementById("signupModal").style.display = "none";
    updateUIForLoggedInUser();

    console.log("User signed up:", currentUser);
  }
}

// Handle contact form
function handleContactForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  trackEvent("Contact Form Submitted", {
    contact_name: name,
    contact_email: email,
    message_length: message.length,
  });

  // Show success message
  alert("Thank you for your message! We'll get back to you soon.");
  document.getElementById("contactForm").reset();
}

// Identify user with Uzera
function identifyUser(user) {
  uzera("identify", {
    id: user.id,
    userData: {
      name: user.name,
      email: user.email,
      join_date: user.join_date,
      plan: user.plan,
      purchased_at: user.purchased_at || null,
      role: user.role,
      account_id: user.account_id || null,
      company_name: user.company_name || null,
      renewal_date: user.renewal_date || null,
      product_name: user.product_name || "Fatima product",
    },
  });
  console.log("User identified:", user);
}

// Track general events
function trackEvent(eventName, data = {}) {
  uzera("track", {
    event: eventName,
    data: {
      ...data,
      timestamp: new Date().toISOString(),
      user_id: currentUser ? currentUser.id : null,
    },
  });
  console.log("Event tracked:", eventName, data);
}

// Track product views
function trackProductView(productId, productName) {
  trackEvent("Product View", {
    product_id: productId,
    product_name: productName,
    product_category: "Electronics",
    custom_string: "Fatima",
  });

  // Add visual feedback
  const card = document.querySelector(`[data-product-id="${productId}"]`);
  card.classList.add("tracking-highlight");
  setTimeout(() => card.classList.remove("tracking-highlight"), 500);
}

// Track purchases
function trackPurchase(productId, productName, productPrice, productCategory) {
  trackEvent("Purchase", {
    product_id: productId,
    product_name: productName,
    product_price: parseFloat(productPrice.replace("$", "").replace(",", "")),
    product_category: productCategory,
    currency: "USD",
  });

  // Show purchase confirmation
  alert(`Thank you for purchasing ${productName}!`);
}

// Update UI for logged in user
function updateUIForLoggedInUser() {
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");

  loginBtn.textContent = `Welcome, ${currentUser.name}`;
  loginBtn.style.background = "#28a745";
  loginBtn.style.color = "white";

  signupBtn.textContent = "Logout";
  signupBtn.onclick = logout;

  // Track user session
  trackEvent("User Session Started");
}

// Logout function
function logout() {
  trackEvent("User Logout");
  currentUser = null;

  // Reset UI
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");

  loginBtn.textContent = "Login";
  loginBtn.style.background = "#ffd700";
  loginBtn.style.color = "#333";
  loginBtn.onclick = function () {
    document.getElementById("loginModal").style.display = "block";
    trackEvent("Login Modal Opened");
  };

  signupBtn.textContent = "Sign Up";
  signupBtn.onclick = function () {
    document.getElementById("signupModal").style.display = "block";
    trackEvent("Signup Modal Opened");
  };

  console.log("User logged out");
}

// Check for existing user (demo purposes)
function checkExistingUser() {
  const savedUser = localStorage.getItem("uzera_test_user");
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    updateUIForLoggedInUser();
    identifyUser(currentUser);
  }
}

// Utility functions
function generateUserId(email) {
  return (
    "user_" +
    btoa(email)
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 8)
  );
}

function generateAccountId() {
  return "acc_" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Track scroll depth
let maxScrollDepth = 0;
window.addEventListener("scroll", function () {
  const scrollDepth = Math.round(
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  );
  if (scrollDepth > maxScrollDepth) {
    maxScrollDepth = scrollDepth;
    if (scrollDepth % 25 === 0) {
      // Track every 25%
      trackEvent("Scroll Depth", {
        depth_percentage: scrollDepth,
      });
    }
  }
});

// Track time on page
let startTime = Date.now();
window.addEventListener("beforeunload", function () {
  const timeOnPage = Math.round((Date.now() - startTime) / 1000);
  trackEvent("Fire when user refreshes", {
    time_on_page_seconds: timeOnPage,
    max_scroll_depth: maxScrollDepth,
  });
});

// Track form interactions
document
  .querySelectorAll("input, textarea, select")
  .forEach(function (element) {
    element.addEventListener("focus", function () {
      trackEvent("Form Field Focus", {
        field_name: this.id || this.name,
        field_type: this.type,
      });
    });

    element.addEventListener("blur", function () {
      trackEvent("Form Field Blur", {
        field_name: this.id || this.name,
        field_type: this.type,
        has_value: this.value.length > 0,
      });
    });
  });

console.log("Uzera tracking script loaded successfully");
