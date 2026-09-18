/**
 * MDMA SPICES AND FOODS — Search Engine & Filter Module
 */

// Header Live Search Input Listener
function initHeaderSearch() {
  const searchInput = document.getElementById('header-search-input');
  const resultsContainer = document.getElementById('search-live-results');
  if (!searchInput || !resultsContainer) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length < 2) {
      resultsContainer.innerHTML = '';
      return;
    }

    const matches = typeof searchProducts === 'function' ? searchProducts(query) : [];
    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 16px; text-align: center; color: var(--text-light-muted); font-size: 0.9rem;">
          No spices or products found matching "<strong>${query}</strong>"
        </div>
      `;
      return;
    }

    let html = '<div style="display: flex; flex-direction: column; gap: 8px;">';
    matches.slice(0, 5).forEach(product => {
      html += `
        <a href="product.html?id=${product.id}" style="display: flex; align-items: center; gap: 14px; padding: 10px; border-radius: 8px; background: rgba(255,255,255,0.03); border: 1px solid rgba(212,175,55,0.15); transition: all 0.2s;" onmouseover="this.style.background='rgba(212,175,55,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.03)'">
          <img src="${product.image}" alt="${product.name}" style="width: 48px; height: 48px; object-fit: cover; border-radius: 6px;">
          <div style="flex-grow: 1;">
            <div style="font-weight: 700; color: #FFFFFF; font-size: 0.92rem;">${product.name}</div>
            <div style="font-size: 0.78rem; color: var(--color-gold-light);">${product.category} • ₹${product.price}</div>
          </div>
          <i class="fa-solid fa-arrow-right" style="color: var(--color-gold); font-size: 0.85rem;"></i>
        </a>
      `;
    });
    html += `
      <a href="search.html?q=${encodeURIComponent(query)}" style="display: block; text-align: center; padding: 10px; font-weight: 700; font-size: 0.85rem; color: var(--color-gold); border-top: 1px solid rgba(255,255,255,0.08); margin-top: 6px;">
        View all ${matches.length} results <i class="fa-solid fa-arrow-right"></i>
      </a>
    </div>`;

    resultsContainer.innerHTML = html;
  });
}

// Dedicated Search Page Renderer
function renderSearchPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q') || '';
  const searchInput = document.getElementById('search-page-input');
  const resultsHeading = document.getElementById('search-results-heading');
  const gridContainer = document.getElementById('search-results-grid');
  const countBadge = document.getElementById('search-results-count');

  if (searchInput) searchInput.value = query;

  const results = query ? searchProducts(query) : getAllProducts();

  if (resultsHeading) {
    resultsHeading.innerHTML = query 
      ? `Search Results for: "<strong>${query}</strong>"` 
      : `Explore Entire Product Catalog`;
  }

  if (countBadge) {
    countBadge.textContent = `${results.length} Products Found`;
  }

  if (!gridContainer) return;

  if (results.length === 0) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 70px 20px; background: var(--bg-light-card); border-radius: var(--border-radius-md); border: 1px solid var(--border-light);">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 3.5rem; color: var(--color-gold); margin-bottom: 20px;"></i>
        <h3 style="margin-bottom: 10px; font-size: 1.5rem;">No Spices Found</h3>
        <p style="color: var(--text-dark-muted); margin-bottom: 24px; max-width: 420px; margin-left: auto; margin-right: auto;">We couldn't find any products matching your query. Try searching for "turmeric", "pepper", "cardamom", or "masala".</p>
        <a href="shop.html" class="btn btn-primary"><i class="fa-solid fa-store"></i> View All Products</a>
      </div>
    `;
    return;
  }

  let html = '';
  results.forEach(product => {
    html += renderProductCardHTML(product);
  });
  gridContainer.innerHTML = html;
}

// Universal Product Card HTML Generator
function renderProductCardHTML(product) {
  const isWish = typeof isInWishlist === 'function' ? isInWishlist(product.id) : false;
  return `
    <div class="product-card" data-category="${product.categorySlug}" data-price="${product.price}" data-rating="${product.rating}">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
        ${product.badge ? `<span class="product-badge badge-${product.badgeType || 'bestseller'}">${product.badge}</span>` : ''}
        
        <div class="product-card-actions">
          <button class="card-action-btn wishlist-btn ${isWish ? 'wishlist-active' : ''}" data-id="${product.id}" onclick="toggleWishlist(${product.id})" title="Wishlist">
            <i class="fa-${isWish ? 'solid' : 'regular'} fa-heart"></i>
          </button>
          <button class="card-action-btn" onclick="openQuickView(${product.id})" title="Quick View">
            <i class="fa-regular fa-eye"></i>
          </button>
        </div>

        <button class="card-quickview-btn" onclick="openQuickView(${product.id})">
          <i class="fa-solid fa-magnifying-glass-plus"></i> Quick View
        </button>
      </div>

      <div class="product-content">
        <div class="product-category">${product.category}</div>
        <a href="product.html?id=${product.id}" class="product-title">${product.name}</a>
        
        <div class="product-rating">
          <div class="stars">
            ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(product.rating))}
            ${product.rating % 1 !== 0 ? '<i class="fa-solid fa-star-half-stroke"></i>' : ''}
          </div>
          <span class="rating-count">(${product.reviewCount || 45})</span>
        </div>

        <div class="product-price-row">
          <span class="current-price">₹${product.price}</span>
          ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice}</span>` : ''}
          ${product.oldPrice ? `<span class="discount-badge">${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF</span>` : ''}
        </div>

        <div class="product-card-footer">
          <button class="card-add-cart-btn" onclick="addToCart(${product.id}, 1)">
            <i class="fa-solid fa-bag-shopping"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}
