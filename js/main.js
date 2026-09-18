/**
 * MDMA SPICES AND FOODS — Core UI Controller & Global Orchestrator
 */

// Toast Notifications System
function showToast(type = 'success', title = 'Success', message = '') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const iconMap = {
    success: 'fa-circle-check',
    error: 'fa-triangle-exclamation',
    info: 'fa-circle-info'
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fa-solid ${iconMap[type] || 'fa-bell'}"></i>
    </div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark"></i></button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Update Header Badges
function updateHeaderBadges() {
  const cartBadge = document.getElementById('header-cart-badge');
  const wishlistBadge = document.getElementById('header-wishlist-badge');

  if (typeof getCart === 'function' && cartBadge) {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    cartBadge.textContent = count;
    cartBadge.style.display = count > 0 ? 'flex' : 'none';
  }

  if (typeof getWishlist === 'function' && wishlistBadge) {
    const wishlist = getWishlist();
    wishlistBadge.textContent = wishlist.length;
    wishlistBadge.style.display = wishlist.length > 0 ? 'flex' : 'none';
  }
}

// Sticky Header & Scroll Reveal
function initScrollEffects() {
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll reveal observer
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 120;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  });
}

// Mobile Menu Drawer
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('close-mobile-drawer');
  const drawer = document.getElementById('mobile-nav-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');

  function openDrawer() {
    drawer?.classList.add('active');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer?.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);
}

// Search Modal Popup
function initSearchModal() {
  const openBtns = document.querySelectorAll('.open-search-modal');
  const closeBtn = document.getElementById('close-search-modal');
  const modal = document.getElementById('search-modal');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal?.classList.add('active');
      document.getElementById('header-search-input')?.focus();
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal?.classList.remove('active');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

// Quick View Modal
function openQuickView(productId) {
  const product = typeof getProductById === 'function' ? getProductById(productId) : null;
  if (!product) return;

  let modalBackdrop = document.getElementById('quickview-modal');
  if (!modalBackdrop) {
    modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'quickview-modal';
    modalBackdrop.className = 'modal-backdrop';
    document.body.appendChild(modalBackdrop);
  }

  const isWish = typeof isInWishlist === 'function' ? isInWishlist(product.id) : false;

  modalBackdrop.innerHTML = `
    <div class="modal-card">
      <button class="modal-close-btn" onclick="closeQuickView()"><i class="fa-solid fa-xmark"></i></button>
      <div style="display: grid; grid-template-columns: 1fr 1.1fr; gap: 30px; align-items: center;" class="quickview-grid">
        <div style="border-radius: 12px; overflow: hidden; background: #121210; border: 1px solid var(--border-gold);">
          <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 360px; object-fit: cover;">
        </div>
        <div>
          <div style="font-size: 0.82rem; font-weight: 700; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px;">${product.category}</div>
          <h2 style="color: #FFFFFF; font-size: 1.6rem; margin-bottom: 10px;">${product.name}</h2>
          
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px;">
            <div class="stars">
              ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(product.rating))}
              ${product.rating % 1 !== 0 ? '<i class="fa-solid fa-star-half-stroke"></i>' : ''}
            </div>
            <span style="color: var(--text-light-muted); font-size: 0.85rem;">(${product.reviewCount || 50} verified reviews)</span>
          </div>

          <div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 18px;">
            <span style="font-size: 1.6rem; font-weight: 800; color: var(--color-gold-light);">₹${product.price}</span>
            ${product.oldPrice ? `<span style="font-size: 1.1rem; color: #888; text-decoration: line-through;">₹${product.oldPrice}</span>` : ''}
            ${product.oldPrice ? `<span style="background: #2D6A4F; color: #FFF; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 4px;">Save ₹${product.oldPrice - product.price}</span>` : ''}
          </div>

          <p style="color: var(--text-light-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 20px;">
            ${product.shortDesc}
          </p>

          <!-- Weight Variations -->
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 700; color: var(--color-gold-light); margin-bottom: 8px;">Select Pack Size:</label>
            <div style="display: flex; gap: 8px;" id="qv-weight-options">
              ${product.weightOptions.map((w, idx) => `
                <button type="button" class="qv-weight-btn ${idx === 0 ? 'active' : ''}" onclick="selectQvWeight(this, '${w}')" style="padding: 6px 14px; border: 1px solid var(--border-gold); background: ${idx === 0 ? 'var(--color-gold)' : 'rgba(255,255,255,0.05)'}; color: ${idx === 0 ? '#000' : '#FFF'}; font-weight: 700; border-radius: 6px; font-size: 0.85rem; cursor: pointer;">${w}</button>
              `).join('')}
            </div>
          </div>

          <!-- Quantity & Action -->
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
            <div class="qty-picker" style="background: rgba(255,255,255,0.05); color: #FFF;">
              <button class="qty-btn" onclick="adjustQvQty(-1)"><i class="fa-solid fa-minus"></i></button>
              <input type="text" id="qv-qty-input" class="qty-input" value="1" readonly style="color: #FFF;">
              <button class="qty-btn" onclick="adjustQvQty(1)"><i class="fa-solid fa-plus"></i></button>
            </div>
            
            <button class="btn btn-primary" style="flex-grow: 1;" onclick="handleQvAddToCart(${product.id})">
              <i class="fa-solid fa-bag-shopping"></i> Add to Cart
            </button>
            
            <button class="card-action-btn wishlist-btn ${isWish ? 'wishlist-active' : ''}" onclick="toggleWishlist(${product.id})" style="width: 44px; height: 44px;">
              <i class="fa-${isWish ? 'solid' : 'regular'} fa-heart"></i>
            </button>
          </div>

          <a href="product.html?id=${product.id}" style="color: var(--color-gold); font-size: 0.88rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
            View Full Product Information &amp; Lab Details <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  modalBackdrop.classList.add('active');
}

let selectedQvWeightVal = '';

function selectQvWeight(el, weight) {
  document.querySelectorAll('.qv-weight-btn').forEach(btn => {
    btn.style.background = 'rgba(255,255,255,0.05)';
    btn.style.color = '#FFF';
  });
  el.style.background = 'var(--color-gold)';
  el.style.color = '#000';
  selectedQvWeightVal = weight;
}

function adjustQvQty(delta) {
  const input = document.getElementById('qv-qty-input');
  if (!input) return;
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  input.value = val;
}

function handleQvAddToCart(productId) {
  const input = document.getElementById('qv-qty-input');
  const qty = input ? parseInt(input.value) : 1;
  const product = typeof getProductById === 'function' ? getProductById(productId) : null;
  const weight = selectedQvWeightVal || (product && product.weightOptions[0]) || 'Standard';

  if (typeof addToCart === 'function') {
    addToCart(productId, qty, weight);
    closeQuickView();
  }
}

function closeQuickView() {
  const modal = document.getElementById('quickview-modal');
  modal?.classList.remove('active');
}

// Accordion Toggles
function initAccordions() {
  document.querySelectorAll('.faq-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close other siblings
      const siblingItems = item.parentElement.querySelectorAll('.faq-item');
      siblingItems.forEach(sib => sib.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Newsletter Forms
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form, #footer-newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('success', 'Subscribed to MDMA Culinary Club!', 'Thank you! You will now receive chef tips, secret spice blends, and exclusive deals.');
        input.value = '';
      }
    });
  });
}

// Master Initialization
document.addEventListener('DOMContentLoaded', () => {
  updateHeaderBadges();
  initScrollEffects();
  initMobileMenu();
  initSearchModal();
  initAccordions();
  initNewsletter();

  if (typeof initHeaderSearch === 'function') initHeaderSearch();
  if (typeof renderCartPage === 'function') renderCartPage();
  if (typeof renderWishlistPage === 'function') renderWishlistPage();
  if (typeof renderSearchPage === 'function') renderSearchPage();
  if (typeof initCheckoutPage === 'function') initCheckoutPage();
  if (typeof renderOrderSuccessPage === 'function') renderOrderSuccessPage();
  if (typeof renderAccountDashboard === 'function') renderAccountDashboard();
  if (typeof renderOrdersPage === 'function') renderOrdersPage();
  if (typeof renderOrderTrackingPage === 'function') renderOrderTrackingPage();
});
