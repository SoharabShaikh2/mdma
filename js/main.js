/**
 * MDMA SPICES AND FOODS — Master UI Controller & Global Orchestrator
 * Fully modular and ready for backend / WordPress WooCommerce API integration.
 */

// Global Toast Notification System
function showToast(type = 'success', title = 'Notification', message = '') {
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
    <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Close Notification"><i class="fa-solid fa-xmark"></i></button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Update Header Badges across entire website
function updateHeaderBadges() {
  const cartBadges = document.querySelectorAll('.header-cart-badge, #header-cart-badge');
  const wishlistBadges = document.querySelectorAll('.header-wishlist-badge, #header-wishlist-badge');

  if (typeof getCart === 'function') {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    cartBadges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  if (typeof getWishlist === 'function') {
    const wishlist = getWishlist();
    const count = wishlist.length;
    wishlistBadges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  }
}

// Sticky Header & Scroll Effects
function initScrollEffects() {
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 100;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }, { passive: true });
}

// Mobile Menu Drawer Handler
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

  // Close drawer on clicking links inside
  drawer?.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

// Search Modal Popup Handler
function initSearchModal() {
  const openBtns = document.querySelectorAll('.open-search-modal');
  const closeBtn = document.getElementById('close-search-modal');
  const modal = document.getElementById('search-modal');
  const searchInput = document.getElementById('header-search-input');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal?.classList.add('active');
      setTimeout(() => searchInput?.focus(), 150);
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

  // ESC key closes search modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
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
      <button class="modal-close-btn" onclick="closeQuickView()" aria-label="Close Modal"><i class="fa-solid fa-xmark"></i></button>
      <div style="display: grid; grid-template-columns: 1fr 1.15fr; gap: 28px; align-items: center;" class="quickview-grid">
        <div style="border-radius: 12px; overflow: hidden; background: #121210; border: 1px solid var(--border-gold);">
          <img src="${product.image}" alt="${product.name}" style="width: 100%; height: clamp(260px, 35vw, 360px); object-fit: cover;">
        </div>
        <div>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">${product.category}</div>
          <h2 style="color: #FFFFFF; font-size: clamp(1.2rem, 2.5vw, 1.6rem); margin-bottom: 8px;">${product.name}</h2>
          
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <div class="stars" style="color: #F5A623;">
              ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(product.rating))}
              ${product.rating % 1 !== 0 ? '<i class="fa-solid fa-star-half-stroke"></i>' : ''}
            </div>
            <span style="color: var(--text-light-muted); font-size: 0.82rem;">(${product.reviewCount || 50} verified reviews)</span>
          </div>

          <div style="display: flex; align-items: baseline; gap: 10px; margin-bottom: 14px; flex-wrap: wrap;">
            <span style="font-size: 1.5rem; font-weight: 800; color: var(--color-gold-light);">₹${product.price}</span>
            ${product.oldPrice ? `<span style="font-size: 1rem; color: #888; text-decoration: line-through;">₹${product.oldPrice}</span>` : ''}
            ${product.oldPrice ? `<span style="background: #2D6A4F; color: #FFF; font-size: 0.72rem; font-weight: 700; padding: 2px 6px; border-radius: 4px;">Save ₹${product.oldPrice - product.price}</span>` : ''}
          </div>

          <p style="color: var(--text-light-muted); font-size: 0.9rem; line-height: 1.55; margin-bottom: 16px;">
            ${product.shortDesc}
          </p>

          <!-- Weight Variations -->
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--color-gold-light); margin-bottom: 6px;">Select Pack Size:</label>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="qv-weight-options">
              ${product.weightOptions.map((w, idx) => `
                <button type="button" class="qv-weight-btn ${idx === 0 ? 'active' : ''}" onclick="selectQvWeight(this, '${w}')" style="padding: 6px 12px; border: 1px solid var(--border-gold); background: ${idx === 0 ? 'var(--color-gold)' : 'rgba(255,255,255,0.05)'}; color: ${idx === 0 ? '#000' : '#FFF'}; font-weight: 700; border-radius: 6px; font-size: 0.82rem; cursor: pointer;">${w}</button>
              `).join('')}
            </div>
          </div>

          <!-- Quantity & Action -->
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap;">
            <div class="qty-picker" style="background: rgba(255,255,255,0.05); color: #FFF;">
              <button class="qty-btn" onclick="adjustQvQty(-1)" aria-label="Decrease Quantity"><i class="fa-solid fa-minus"></i></button>
              <input type="text" id="qv-qty-input" class="qty-input" value="1" readonly style="color: #FFF;">
              <button class="qty-btn" onclick="adjustQvQty(1)" aria-label="Increase Quantity"><i class="fa-solid fa-plus"></i></button>
            </div>
            
            <button class="btn btn-primary" style="flex-grow: 1;" onclick="handleQvAddToCart(${product.id})">
              <i class="fa-solid fa-bag-shopping"></i> Add to Cart
            </button>
            
            <button class="card-action-btn wishlist-btn ${isWish ? 'wishlist-active' : ''}" onclick="toggleWishlist(${product.id})" style="width: 42px; height: 42px;" aria-label="Save to Wishlist">
              <i class="fa-${isWish ? 'solid' : 'regular'} fa-heart"></i>
            </button>
          </div>

          <a href="product.html?id=${product.id}" style="color: var(--color-gold); font-size: 0.85rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
            View Full Product Information &amp; Lab Details <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  modalBackdrop.classList.add('active');
  modalBackdrop.onclick = (e) => {
    if (e.target === modalBackdrop) closeQuickView();
  };
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

// Auto highlight active nav links based on URL
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu .nav-link, .mobile-nav-list .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const pureHref = href.split('?')[0].split('#')[0];
    const isHome = (currentPath === '' || currentPath === 'index.html') && (pureHref === 'index.html' || pureHref === './' || pureHref === '');
    const isExactMatch = pureHref === currentPath && !href.includes('#') && !href.includes('?');

    if (isHome || isExactMatch) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Master Homepage Hero Product Slider Controller
function initHeroSlider() {
  const sliderSection = document.getElementById('hero-slider-section');
  if (!sliderSection) return;

  const slides = sliderSection.querySelectorAll('.hero-slide');
  const dots = sliderSection.querySelectorAll('.hero-pagination-dot');
  const prevBtn = document.getElementById('hero-slider-prev');
  const nextBtn = document.getElementById('hero-slider-next');

  if (!slides.length) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoplayTimer = null;
  const slideDuration = 6000; // 6 seconds per slide
  let isPaused = false;

  function updateSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;

    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });

    dots.forEach((dot, i) => {
      const isCurrent = i === currentSlide;
      dot.classList.toggle('active', isCurrent);
      dot.setAttribute('aria-selected', isCurrent ? 'true' : 'false');

      // Reset & trigger fill animation if active
      dot.classList.remove('animating');
      if (isCurrent && !isPaused) {
        void dot.offsetWidth; // Force reflow
        dot.classList.add('animating');
      }
    });
  }

  function nextSlide() {
    updateSlide(currentSlide + 1);
  }

  function prevSlide() {
    updateSlide(currentSlide - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    isPaused = false;
    dots.forEach((dot, i) => {
      if (i === currentSlide) dot.classList.add('animating');
    });
    autoplayTimer = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, slideDuration);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
    dots.forEach(dot => dot.classList.remove('animating'));
  }

  function pauseAutoplay() {
    isPaused = true;
    dots.forEach(dot => dot.classList.remove('animating'));
  }

  function resumeAutoplay() {
    isPaused = false;
    startAutoplay();
  }

  // Event Listeners for Nav Arrows
  prevBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    prevSlide();
    startAutoplay();
  });

  nextBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    nextSlide();
    startAutoplay();
  });

  // Event Listeners for Pagination Dots
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIdx = parseInt(dot.getAttribute('data-slide-index') || '0', 10);
      updateSlide(targetIdx);
      startAutoplay();
    });
  });

  // Pause on Mouse Enter & Resume on Mouse Leave
  sliderSection.addEventListener('mouseenter', pauseAutoplay);
  sliderSection.addEventListener('mouseleave', resumeAutoplay);

  // Keyboard navigation
  sliderSection.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      startAutoplay();
    }
  });

  // Touch Swipe Support for Mobile & Tablet
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;

  sliderSection.addEventListener('touchstart', (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      pauseAutoplay();
    }
  }, { passive: true });

  sliderSection.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
      resumeAutoplay();
    }
  }, { passive: true });

  function handleSwipe() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    // Check if horizontal swipe is dominant and above threshold (40px)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // Initialize first slide and start autoplay
  updateSlide(0);
  startAutoplay();
}

// Master Initialization with Safe Execution
document.addEventListener('DOMContentLoaded', () => {
  updateHeaderBadges();
  initScrollEffects();
  initMobileMenu();
  initSearchModal();
  initAccordions();
  initNewsletter();
  highlightActiveNav();
  initHeroSlider();

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
