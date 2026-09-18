/**
 * MDMA SPICES AND FOODS — Wishlist State Manager & LocalStorage Engine
 */

const WISHLIST_STORAGE_KEY = 'mdma_spices_wishlist';

function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load wishlist from localStorage", e);
    return [];
  }
}

function saveWishlist(wishlist) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    updateHeaderBadges();
  } catch (e) {
    console.error("Failed to save wishlist", e);
  }
}

function isInWishlist(productId) {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === parseInt(productId));
}

function toggleWishlist(productId) {
  const product = typeof getProductById === 'function' ? getProductById(productId) : null;
  if (!product) return;

  let wishlist = getWishlist();
  const index = wishlist.findIndex(item => item.id === product.id);

  if (index > -1) {
    wishlist.splice(index, 1);
    saveWishlist(wishlist);
    if (typeof showToast === 'function') {
      showToast('info', 'Wishlist Updated', `${product.name} removed from your wishlist.`);
    }
  } else {
    wishlist.push({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
      category: product.category,
      inStock: product.inStock
    });
    saveWishlist(wishlist);
    if (typeof showToast === 'function') {
      showToast('success', 'Added to Wishlist', `${product.name} saved to your wishlist.`);
    }
  }

  // Update UI hearts on page
  document.querySelectorAll(`.wishlist-btn[data-id="${product.id}"]`).forEach(btn => {
    btn.classList.toggle('wishlist-active', isInWishlist(product.id));
  });

  if (typeof renderWishlistPage === 'function') {
    renderWishlistPage();
  }
}

function removeFromWishlist(productId) {
  let wishlist = getWishlist();
  wishlist = wishlist.filter(item => item.id !== parseInt(productId));
  saveWishlist(wishlist);
  if (typeof showToast === 'function') {
    showToast('info', 'Item Removed', 'Product removed from wishlist.');
  }
  renderWishlistPage();
}

function moveWishlistToCart(productId) {
  if (typeof addToCart === 'function') {
    addToCart(productId, 1);
    removeFromWishlist(productId);
  }
}

function renderWishlistPage() {
  const container = document.getElementById('wishlist-grid-wrapper');
  if (!container) return;

  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 70px 20px; background: var(--bg-light-card); border-radius: var(--border-radius-md); border: 1px solid var(--border-light);">
        <i class="fa-regular fa-heart" style="font-size: 3.5rem; color: var(--color-gold); margin-bottom: 20px;"></i>
        <h3 style="margin-bottom: 10px; font-size: 1.5rem;">Your Wishlist is Empty</h3>
        <p style="color: var(--text-dark-muted); margin-bottom: 24px; max-width: 420px; margin-left: auto; margin-right: auto;">Keep track of your favourite single-origin spices, gourmet blends, and dry fruits by clicking the heart icon on any product.</p>
        <a href="shop.html" class="btn btn-primary"><i class="fa-solid fa-store"></i> Browse Spice Collections</a>
      </div>
    `;
    return;
  }

  let html = '';
  wishlist.forEach(item => {
    html += `
      <div class="product-card">
        <div class="product-media">
          <img src="${item.image}" alt="${item.name}" class="product-img">
          <div class="product-card-actions" style="opacity: 1; transform: none;">
            <button class="card-action-btn" onclick="removeFromWishlist(${item.id})" title="Remove from Wishlist" style="color: #C0392B;">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
        <div class="product-content">
          <div class="product-category">${item.category}</div>
          <a href="product.html?id=${item.id}" class="product-title">${item.name}</a>
          <div class="product-price-row">
            <span class="current-price">₹${item.price}</span>
            ${item.oldPrice ? `<span class="old-price">₹${item.oldPrice}</span>` : ''}
          </div>
          <div class="product-card-footer">
            <button class="btn btn-primary btn-block btn-sm" onclick="moveWishlistToCart(${item.id})">
              <i class="fa-solid fa-cart-plus"></i> Move to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}
