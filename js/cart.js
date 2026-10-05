/**
 * MDMA SPICES AND FOODS — Cart State Manager & LocalStorage Engine
 * WordPress & WooCommerce ready data structure
 */

const CART_STORAGE_KEY = 'mdma_spices_cart';
const COUPON_STORAGE_KEY = 'mdma_applied_coupon';

const ACTIVE_COUPONS = {
  'MDMA10': { type: 'percent', value: 10, minOrder: 0, desc: '10% Off Entire Order' },
  'SPICE20': { type: 'flat', value: 200, minOrder: 999, desc: '₹200 Off on orders above ₹999' },
  'FREESHIP': { type: 'shipping', value: 100, minOrder: 0, desc: 'Free Shipping' }
};

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load cart from localStorage", e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    if (typeof updateHeaderBadges === 'function') updateHeaderBadges();
  } catch (e) {
    console.error("Failed to save cart to localStorage", e);
  }
}

function addToCart(productId, qty = 1, weight = null) {
  const product = typeof getProductById === 'function' ? getProductById(productId) : null;
  if (!product) return;

  const selectedWeight = weight || (product.weightOptions && product.weightOptions[0]) || "Standard";
  let cart = getCart();

  const existingIndex = cart.findIndex(item => item.id === product.id && item.weight === selectedWeight);

  if (existingIndex > -1) {
    cart[existingIndex].qty += parseInt(qty);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
      category: product.category,
      weight: selectedWeight,
      qty: parseInt(qty)
    });
  }

  saveCart(cart);
  if (typeof showToast === 'function') {
    showToast('success', 'Added to Cart', `${product.name} (${selectedWeight}) has been added.`);
  }
}

function updateCartQuantity(productId, weight, newQty) {
  let cart = getCart();
  const index = cart.findIndex(item => item.id === parseInt(productId) && item.weight === weight);

  if (index > -1) {
    if (newQty <= 0) {
      cart.splice(index, 1);
      if (typeof showToast === 'function') {
        showToast('info', 'Item Removed', 'Item removed from your cart.');
      }
    } else {
      cart[index].qty = parseInt(newQty);
    }
    saveCart(cart);
    if (typeof renderCartPage === 'function') renderCartPage();
  }
}

function removeFromCart(productId, weight) {
  let cart = getCart();
  cart = cart.filter(item => !(item.id === parseInt(productId) && item.weight === weight));
  saveCart(cart);
  if (typeof showToast === 'function') {
    showToast('info', 'Item Removed', 'Item removed from cart.');
  }
  if (typeof renderCartPage === 'function') renderCartPage();
}

function getAppliedCoupon() {
  const code = localStorage.getItem(COUPON_STORAGE_KEY);
  return code && ACTIVE_COUPONS[code] ? { code, ...ACTIVE_COUPONS[code] } : null;
}

function applyCoupon(code) {
  if (!code) {
    if (typeof showToast === 'function') showToast('error', 'Error', 'Please enter a coupon code.');
    return false;
  }
  const cleanCode = code.toUpperCase().trim();
  if (ACTIVE_COUPONS[cleanCode]) {
    const coupon = ACTIVE_COUPONS[cleanCode];
    const subtotal = getCartSubtotal();
    if (coupon.minOrder && subtotal < coupon.minOrder) {
      if (typeof showToast === 'function') {
        showToast('error', 'Coupon Error', `This coupon requires a minimum order of ₹${coupon.minOrder}.`);
      }
      return false;
    }
    localStorage.setItem(COUPON_STORAGE_KEY, cleanCode);
    if (typeof showToast === 'function') {
      showToast('success', 'Coupon Applied!', `Coupon ${cleanCode} applied successfully.`);
    }
    if (typeof renderCartPage === 'function') renderCartPage();
    return true;
  } else {
    if (typeof showToast === 'function') {
      showToast('error', 'Invalid Coupon', 'The coupon code entered is not valid.');
    }
    return false;
  }
}

function removeCoupon() {
  localStorage.removeItem(COUPON_STORAGE_KEY);
  if (typeof showToast === 'function') {
    showToast('info', 'Coupon Removed', 'Promo code has been removed.');
  }
  if (typeof renderCartPage === 'function') renderCartPage();
}

function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function getCartCalculations() {
  const subtotal = getCartSubtotal();
  const coupon = getAppliedCoupon();
  let discount = 0;

  if (coupon) {
    if (coupon.type === 'percent') {
      discount = Math.round((subtotal * coupon.value) / 100);
    } else if (coupon.type === 'flat') {
      discount = Math.min(subtotal, coupon.value);
    }
  }

  let shipping = 0;
  if (subtotal > 0) {
    if (subtotal >= 499 || (coupon && coupon.type === 'shipping')) {
      shipping = 0;
    } else {
      shipping = 60;
    }
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableAmount * 0.05);
  const total = taxableAmount + shipping + tax;

  return {
    subtotal,
    discount,
    shipping,
    tax,
    total,
    freeShippingThreshold: 499,
    remainingForFreeShipping: Math.max(0, 499 - subtotal)
  };
}

function renderCartPage() {
  const cartContainer = document.getElementById('cart-items-wrapper');
  const summaryContainer = document.getElementById('cart-summary-wrapper');
  if (!cartContainer || !summaryContainer) return;

  const cart = getCart();
  const calcs = getCartCalculations();
  const coupon = getAppliedCoupon();

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart-state" style="text-align: center; padding: 60px 20px; background: var(--bg-light-card); border-radius: var(--border-radius-md); border: 1px solid var(--border-light);">
        <i class="fa-solid fa-basket-shopping" style="font-size: 3.5rem; color: var(--color-gold); margin-bottom: 20px;"></i>
        <h3 style="margin-bottom: 10px; font-size: 1.5rem;">Your Cart is Currently Empty</h3>
        <p style="color: var(--text-dark-muted); margin-bottom: 24px; max-width: 400px; margin-left: auto; margin-right: auto;">Explore our artisanal single-origin spices, blends, and pantry collections to fill your kitchen with royal aromas.</p>
        <a href="shop.html" class="btn btn-primary"><i class="fa-solid fa-store"></i> Explore Spice Catalog</a>
      </div>
    `;
    summaryContainer.style.display = 'none';
    return;
  }

  summaryContainer.style.display = 'block';

  const percentToFree = Math.min(100, Math.round((calcs.subtotal / calcs.freeShippingThreshold) * 100));
  const freeShipText = calcs.remainingForFreeShipping === 0 
    ? `<span style="color: #2D6A4F; font-weight: 700;"><i class="fa-solid fa-circle-check"></i> Congratulations! You've unlocked FREE Delivery</span>`
    : `Add <strong>₹${calcs.remainingForFreeShipping}</strong> more to qualify for <strong>FREE Delivery</strong>`;

  let html = `
    <!-- Free Shipping Progress -->
    <div style="background: var(--bg-light-secondary); border: 1px solid var(--border-light); padding: 16px 20px; border-radius: var(--border-radius-md); margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
        <span>${freeShipText}</span>
        <span style="font-weight: 700;">${percentToFree}%</span>
      </div>
      <div style="height: 6px; background: rgba(0,0,0,0.08); border-radius: 99px; overflow: hidden;">
        <div style="width: ${percentToFree}%; height: 100%; background: var(--color-primary); transition: width 0.4s ease;"></div>
      </div>
    </div>

    <!-- Items Table -->
    <div class="table-responsive">
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr style="border-bottom: 2px solid var(--border-light); font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dark-muted);">
            <th style="padding: 12px 10px;">Product</th>
            <th style="padding: 12px 10px;">Weight</th>
            <th style="padding: 12px 10px;">Price</th>
            <th style="padding: 12px 10px;">Quantity</th>
            <th style="padding: 12px 10px;">Subtotal</th>
            <th style="padding: 12px 10px; text-align: right;">Action</th>
          </tr>
        </thead>
        <tbody>
  `;

  cart.forEach(item => {
    const itemSubtotal = item.price * item.qty;
    html += `
      <tr style="border-bottom: 1px solid var(--border-light); vertical-align: middle;">
        <td style="padding: 14px 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${item.image}" alt="${item.name}" style="width: 58px; height: 58px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-light); flex-shrink: 0;">
            <div>
              <a href="product.html?id=${item.id}" style="font-weight: 700; font-size: 0.95rem; color: var(--text-dark);">${item.name}</a>
              <div style="font-size: 0.78rem; color: var(--color-gold-dark); text-transform: uppercase;">${item.category}</div>
            </div>
          </div>
        </td>
        <td style="padding: 14px 10px; font-size: 0.88rem; font-weight: 600;">
          <span style="background: rgba(0,0,0,0.05); padding: 3px 8px; border-radius: 4px;">${item.weight}</span>
        </td>
        <td style="padding: 14px 10px; font-weight: 700; font-size: 0.95rem;">₹${item.price}</td>
        <td style="padding: 14px 10px;">
          <div class="qty-picker">
            <button class="qty-btn" onclick="updateCartQuantity(${item.id}, '${item.weight}', ${item.qty - 1})" aria-label="Decrease"><i class="fa-solid fa-minus"></i></button>
            <input type="text" class="qty-input" value="${item.qty}" readonly>
            <button class="qty-btn" onclick="updateCartQuantity(${item.id}, '${item.weight}', ${item.qty + 1})" aria-label="Increase"><i class="fa-solid fa-plus"></i></button>
          </div>
        </td>
        <td style="padding: 14px 10px; font-weight: 800; font-size: 1rem; color: var(--color-red);">₹${itemSubtotal}</td>
        <td style="padding: 14px 10px; text-align: right;">
          <button onclick="removeFromCart(${item.id}, '${item.weight}')" style="color: #999; font-size: 1.1rem; padding: 6px; transition: color 0.2s; cursor: pointer;" onmouseover="this.style.color='#C0392B'" onmouseout="this.style.color='#999'" aria-label="Remove Item">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>

    <!-- Bottom Actions -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; flex-wrap: wrap; gap: 14px;">
      <a href="shop.html" class="btn btn-outline-dark"><i class="fa-solid fa-arrow-left"></i> Continue Shopping</a>
      <button onclick="localStorage.removeItem('${CART_STORAGE_KEY}'); renderCartPage(); updateHeaderBadges();" class="btn btn-outline-dark" style="font-size: 0.85rem;"><i class="fa-solid fa-broom"></i> Clear Cart</button>
    </div>
  `;

  cartContainer.innerHTML = html;

  // Render Cart Summary
  summaryContainer.innerHTML = `
    <div style="background: var(--bg-light-card); border: 1px solid var(--border-gold); border-radius: var(--border-radius-md); padding: clamp(20px, 3vw, 28px); box-shadow: var(--shadow-sm);">
      <h3 style="font-size: 1.25rem; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid var(--border-light);">Order Summary</h3>
      
      <!-- Promo Coupon Box -->
      <div style="margin-bottom: 22px;">
        <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 8px;">Apply Promo Code</label>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <input type="text" id="coupon-code-input" placeholder="MDMA10, SPICE20" value="${coupon ? coupon.code : ''}" style="flex-grow: 1; padding: 10px 14px; border: 1px solid rgba(0,0,0,0.15); border-radius: 6px; text-transform: uppercase; min-width: 140px;">
          ${coupon 
            ? `<button onclick="removeCoupon()" class="btn btn-secondary btn-sm">Remove</button>`
            : `<button onclick="applyCoupon(document.getElementById('coupon-code-input').value)" class="btn btn-primary btn-sm">Apply</button>`
          }
        </div>
        ${coupon ? `<div style="font-size: 0.8rem; color: #2D6A4F; margin-top: 6px; font-weight: 600;"><i class="fa-solid fa-circle-check"></i> ${coupon.desc}</div>` : ''}
      </div>

      <!-- Financial Breakdown -->
      <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.95rem; margin-bottom: 22px; border-top: 1px solid var(--border-light); padding-top: 16px;">
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-dark-muted);">Cart Subtotal</span>
          <span style="font-weight: 700;">₹${calcs.subtotal}</span>
        </div>

        ${calcs.discount > 0 ? `
          <div style="display: flex; justify-content: space-between; color: #2D6A4F; font-weight: 600;">
            <span>Coupon Discount</span>
            <span>- ₹${calcs.discount}</span>
          </div>
        ` : ''}

        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-dark-muted);">Estimated Shipping</span>
          <span style="font-weight: 700;">${calcs.shipping === 0 ? '<span style="color:#2D6A4F">FREE</span>' : '₹' + calcs.shipping}</span>
        </div>

        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-dark-muted);">GST (5% Included)</span>
          <span style="font-weight: 700;">₹${calcs.tax}</span>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 800; border-top: 2px solid var(--border-light); padding-top: 14px; margin-top: 6px; color: var(--color-red);">
          <span>Grand Total</span>
          <span>₹${calcs.total}</span>
        </div>
      </div>

      <a href="checkout.html" class="btn btn-primary btn-block btn-lg" style="font-size: 1rem;"><i class="fa-solid fa-lock"></i> Proceed to Checkout</a>

      <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 16px; font-size: 0.78rem; color: var(--text-dark-muted);">
        <i class="fa-solid fa-shield-halved" style="color: var(--color-gold);"></i> 256-Bit SSL Encrypted Checkout
      </div>
    </div>
  `;
}
