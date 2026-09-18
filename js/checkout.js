/**
 * MDMA SPICES AND FOODS — Checkout Engine & Simulated Order Processing
 */

const ORDERS_STORAGE_KEY = 'mdma_spices_orders';
const LATEST_ORDER_KEY = 'mdma_latest_order';

function initCheckoutPage() {
  const checkoutItemsContainer = document.getElementById('checkout-items-summary');
  const checkoutTotalsContainer = document.getElementById('checkout-totals-summary');
  const checkoutForm = document.getElementById('checkout-form');

  if (!checkoutItemsContainer || !checkoutTotalsContainer) return;

  const cart = typeof getCart === 'function' ? getCart() : [];

  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  const calcs = typeof getCartCalculations === 'function' ? getCartCalculations() : { subtotal: 0, discount: 0, shipping: 0, tax: 0, total: 0 };
  const coupon = typeof getAppliedCoupon === 'function' ? getAppliedCoupon() : null;

  // Render items list
  let itemsHtml = '<div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px;">';
  cart.forEach(item => {
    itemsHtml += `
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 0.92rem;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="position: relative;">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-light);">
            <span style="position: absolute; top: -6px; right: -6px; background: var(--color-gold); color: #000; font-size: 0.7rem; font-weight: 800; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">${item.qty}</span>
          </div>
          <div>
            <div style="font-weight: 700; line-height: 1.2;">${item.name}</div>
            <div style="font-size: 0.78rem; color: var(--text-dark-muted);">${item.weight}</div>
          </div>
        </div>
        <div style="font-weight: 700;">₹${item.price * item.qty}</div>
      </div>
    `;
  });
  itemsHtml += '</div>';
  checkoutItemsContainer.innerHTML = itemsHtml;

  // Render Totals Breakdown
  checkoutTotalsContainer.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.92rem; border-top: 1px solid var(--border-light); padding-top: 16px;">
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--text-dark-muted);">Subtotal</span>
        <span style="font-weight: 700;">₹${calcs.subtotal}</span>
      </div>
      ${calcs.discount > 0 ? `
        <div style="display: flex; justify-content: space-between; color: #2D6A4F; font-weight: 600;">
          <span>Coupon (${coupon.code})</span>
          <span>- ₹${calcs.discount}</span>
        </div>
      ` : ''}
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--text-dark-muted);">Shipping</span>
        <span style="font-weight: 700;">${calcs.shipping === 0 ? '<span style="color:#2D6A4F">FREE</span>' : '₹' + calcs.shipping}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--text-dark-muted);">Taxes (GST 5%)</span>
        <span style="font-weight: 700;">₹${calcs.tax}</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 800; color: var(--color-red); border-top: 2px solid var(--border-light); padding-top: 12px;">
        <span>Total Payable</span>
        <span>₹${calcs.total}</span>
      </div>
    </div>
  `;

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handlePlaceOrder();
    });
  }
}

function handlePlaceOrder() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  // Gather Form Values
  const firstName = document.getElementById('billing_fname')?.value.trim();
  const lastName = document.getElementById('billing_lname')?.value.trim();
  const email = document.getElementById('billing_email')?.value.trim();
  const phone = document.getElementById('billing_phone')?.value.trim();
  const address = document.getElementById('billing_address')?.value.trim();
  const city = document.getElementById('billing_city')?.value.trim();
  const state = document.getElementById('billing_state')?.value.trim();
  const pincode = document.getElementById('billing_pincode')?.value.trim();
  
  const paymentMethodInput = document.querySelector('input[name="payment_method"]:checked');
  const paymentMethod = paymentMethodInput ? paymentMethodInput.value : 'Cash on Delivery';

  if (!firstName || !email || !phone || !address || !city || !pincode) {
    if (typeof showToast === 'function') {
      showToast('error', 'Missing Information', 'Please fill in all required shipping and contact details.');
    }
    return;
  }

  const cart = typeof getCart === 'function' ? getCart() : [];
  const calcs = typeof getCartCalculations === 'function' ? getCartCalculations() : {};
  
  // Generate random order ID
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const orderId = `MDMA-${randomNum}`;
  const now = new Date();
  const orderDate = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  // Calculate estimated delivery: 4 days from now
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const estimatedDelivery = deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  const orderData = {
    orderId,
    orderDate,
    estimatedDelivery,
    status: 'Order Placed',
    customer: {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      address: `${address}, ${city}, ${state} - ${pincode}`
    },
    paymentMethod,
    items: cart,
    totals: calcs
  };

  // Save to orders history in localStorage
  try {
    const existingOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
    existingOrders.unshift(orderData);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(existingOrders));
    localStorage.setItem(LATEST_ORDER_KEY, JSON.stringify(orderData));
  } catch (e) {
    console.error("Failed to store order", e);
  }

  // Clear current cart
  localStorage.removeItem('mdma_spices_cart');
  localStorage.removeItem('mdma_applied_coupon');

  // Redirect to Order Success Page
  window.location.href = `order-success.html?orderId=${orderId}`;
}

// Render Order Success Page
function renderOrderSuccessPage() {
  const container = document.getElementById('order-success-content');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('orderId');

  let order = null;
  try {
    const latest = localStorage.getItem(LATEST_ORDER_KEY);
    if (latest) order = JSON.parse(latest);
  } catch (e) {
    console.error(e);
  }

  if (!order) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <i class="fa-solid fa-circle-check" style="font-size: 4rem; color: var(--color-green); margin-bottom: 20px;"></i>
        <h2>Thank you for your Order!</h2>
        <p style="color: var(--text-dark-muted); margin-bottom: 24px;">Your order has been confirmed and our spice masters are preparing your package.</p>
        <a href="shop.html" class="btn btn-primary"><i class="fa-solid fa-store"></i> Continue Shopping</a>
      </div>
    `;
    return;
  }

  let itemsHtml = '';
  order.items.forEach(item => {
    itemsHtml += `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border-light);">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px;">
          <div>
            <div style="font-weight: 700;">${item.name}</div>
            <div style="font-size: 0.8rem; color: var(--text-dark-muted);">${item.weight} • Qty: ${item.qty}</div>
          </div>
        </div>
        <div style="font-weight: 700;">₹${item.price * item.qty}</div>
      </div>
    `;
  });

  container.innerHTML = `
    <div style="background: var(--bg-light-card); border: 1px solid var(--border-gold); border-radius: var(--border-radius-lg); padding: 40px; box-shadow: var(--shadow-md); max-width: 760px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="width: 76px; height: 76px; border-radius: 50%; background: #E8F5E9; border: 2px solid #2D6A4F; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; color: #2D6A4F; font-size: 2.2rem;">
          <i class="fa-solid fa-check"></i>
        </div>
        <h2 style="font-size: 1.8rem; margin-bottom: 8px;">Order Placed Successfully!</h2>
        <p style="color: var(--text-dark-muted);">We have received your order and sent a confirmation email to <strong>${order.customer.email}</strong></p>
      </div>

      <div style="background: var(--bg-light-secondary); border-radius: var(--border-radius-md); padding: 20px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 30px; font-size: 0.92rem;">
        <div>
          <span style="color: var(--text-dark-muted); display: block; font-size: 0.82rem;">Order Reference</span>
          <strong style="color: var(--color-red); font-size: 1.05rem;">${order.orderId}</strong>
        </div>
        <div>
          <span style="color: var(--text-dark-muted); display: block; font-size: 0.82rem;">Order Date</span>
          <strong>${order.orderDate}</strong>
        </div>
        <div>
          <span style="color: var(--text-dark-muted); display: block; font-size: 0.82rem;">Payment Mode</span>
          <strong>${order.paymentMethod}</strong>
        </div>
        <div>
          <span style="color: var(--text-dark-muted); display: block; font-size: 0.82rem;">Estimated Delivery</span>
          <strong style="color: #2D6A4F;">${order.estimatedDelivery}</strong>
        </div>
      </div>

      <h4 style="font-size: 1.15rem; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid var(--border-light);">Ordered Items</h4>
      <div style="margin-bottom: 24px;">
        ${itemsHtml}
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 800; padding: 16px 0; border-top: 2px solid var(--border-light); margin-bottom: 30px; color: var(--color-red);">
        <span>Total Amount</span>
        <span>₹${order.totals.total}</span>
      </div>

      <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        <a href="order-tracking.html?orderId=${order.orderId}" class="btn btn-primary"><i class="fa-solid fa-truck-fast"></i> Track Order Status</a>
        <a href="shop.html" class="btn btn-outline-dark"><i class="fa-solid fa-store"></i> Continue Shopping</a>
      </div>
    </div>
  `;
}
