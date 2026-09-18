/**
 * MDMA SPICES AND FOODS — Customer Dashboard, Orders & Live Tracking
 */

// Seed initial demo orders if empty
function seedDemoOrdersIfEmpty() {
  const existing = localStorage.getItem('mdma_spices_orders');
  if (!existing || JSON.parse(existing).length === 0) {
    const demoOrders = [
      {
        orderId: "MDMA-892415",
        orderDate: "12 Sep 2026",
        estimatedDelivery: "16 Sep 2026",
        status: "Delivered",
        customer: {
          name: "Sakhil Mondal",
          email: "customer@mdmaspices.com",
          phone: "+91 98765 43210",
          address: "14B Royal Palms, Connaught Place, New Delhi - 110001"
        },
        paymentMethod: "UPI (Google Pay)",
        items: [
          {
            id: 1,
            name: "Pure Salem Turmeric Powder",
            price: 180,
            qty: 2,
            weight: "250g",
            image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 9,
            name: "MDMA Royal Heritage Garam Masala",
            price: 260,
            qty: 1,
            weight: "250g",
            image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
          }
        ],
        totals: { subtotal: 620, discount: 62, shipping: 0, tax: 28, total: 586 }
      },
      {
        orderId: "MDMA-947201",
        orderDate: "16 Sep 2026",
        estimatedDelivery: "20 Sep 2026",
        status: "Out for Delivery",
        customer: {
          name: "Sakhil Mondal",
          email: "customer@mdmaspices.com",
          phone: "+91 98765 43210",
          address: "14B Royal Palms, Connaught Place, New Delhi - 110001"
        },
        paymentMethod: "Credit Card (Visa)",
        items: [
          {
            id: 5,
            name: "Malabar Bold Black Pepper",
            price: 380,
            qty: 1,
            weight: "500g",
            image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 13,
            name: "Kashmiri Mongra Saffron",
            price: 950,
            qty: 1,
            weight: "2g",
            image: "https://images.unsplash.com/photo-1608797178974-15b35a61deda?auto=format&fit=crop&w=800&q=80"
          }
        ],
        totals: { subtotal: 1330, discount: 200, shipping: 0, tax: 56, total: 1186 }
      }
    ];
    localStorage.setItem('mdma_spices_orders', JSON.stringify(demoOrders));
  }
}

// Render My Account Dashboard
function renderAccountDashboard() {
  seedDemoOrdersIfEmpty();
  const orders = JSON.parse(localStorage.getItem('mdma_spices_orders') || '[]');
  const wishlist = typeof getWishlist === 'function' ? getWishlist() : [];

  const totalOrdersEl = document.getElementById('dash-total-orders');
  const pendingOrdersEl = document.getElementById('dash-pending-orders');
  const completedOrdersEl = document.getElementById('dash-completed-orders');
  const wishlistCountEl = document.getElementById('dash-wishlist-count');
  const recentOrdersTable = document.getElementById('dash-recent-orders-table');

  if (totalOrdersEl) totalOrdersEl.textContent = orders.length;
  if (pendingOrdersEl) pendingOrdersEl.textContent = orders.filter(o => o.status !== 'Delivered').length;
  if (completedOrdersEl) completedOrdersEl.textContent = orders.filter(o => o.status === 'Delivered').length;
  if (wishlistCountEl) wishlistCountEl.textContent = wishlist.length;

  if (recentOrdersTable) {
    if (orders.length === 0) {
      recentOrdersTable.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 30px; color: var(--text-dark-muted);">No orders placed yet.</td></tr>`;
      return;
    }

    let html = '';
    orders.slice(0, 3).forEach(order => {
      const statusClass = order.status === 'Delivered' ? 'background: #E8F5E9; color: #2D6A4F;' : 'background: #FFF3E0; color: #E65100;';
      html += `
        <tr style="border-bottom: 1px solid var(--border-light); vertical-align: middle;">
          <td style="padding: 14px 10px; font-weight: 700; color: var(--color-red);">${order.orderId}</td>
          <td style="padding: 14px 10px;">${order.orderDate}</td>
          <td style="padding: 14px 10px;">${order.items.length} Items</td>
          <td style="padding: 14px 10px; font-weight: 700;">₹${order.totals.total}</td>
          <td style="padding: 14px 10px;">
            <span style="padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; font-weight: 700; ${statusClass}">${order.status}</span>
          </td>
          <td style="padding: 14px 10px; text-align: right;">
            <a href="order-tracking.html?orderId=${order.orderId}" class="btn btn-primary btn-sm" style="padding: 6px 12px; font-size: 0.8rem;">Track</a>
          </td>
        </tr>
      `;
    });
    recentOrdersTable.innerHTML = html;
  }
}

// Render Orders History Page
function renderOrdersPage() {
  seedDemoOrdersIfEmpty();
  const orders = JSON.parse(localStorage.getItem('mdma_spices_orders') || '[]');
  const tableBody = document.getElementById('orders-table-body');
  if (!tableBody) return;

  if (orders.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-dark-muted);">You have not placed any orders yet. <a href="shop.html" style="color: var(--color-gold); font-weight: 700;">Start Shopping</a></td></tr>`;
    return;
  }

  let html = '';
  orders.forEach(order => {
    const statusClass = order.status === 'Delivered' 
      ? 'background: #E8F5E9; color: #2D6A4F; border: 1px solid #C8E6C9;' 
      : 'background: #FFF3E0; color: #E65100; border: 1px solid #FFE0B2;';
    
    html += `
      <tr style="border-bottom: 1px solid var(--border-light); vertical-align: middle;">
        <td style="padding: 18px 12px; font-weight: 700; color: var(--color-red); font-size: 1rem;">${order.orderId}</td>
        <td style="padding: 18px 12px; font-size: 0.9rem;">${order.orderDate}</td>
        <td style="padding: 18px 12px;">
          <div style="font-weight: 600; font-size: 0.92rem;">${order.items.map(i => `${i.name} (x${i.qty})`).join(', ')}</div>
        </td>
        <td style="padding: 18px 12px; font-weight: 800; font-size: 1.05rem;">₹${order.totals.total}</td>
        <td style="padding: 18px 12px;">
          <span style="padding: 4px 10px; border-radius: 4px; font-size: 0.82rem; font-weight: 700; ${statusClass}">${order.status}</span>
        </td>
        <td style="padding: 18px 12px; text-align: right;">
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <a href="order-tracking.html?orderId=${order.orderId}" class="btn btn-primary btn-sm" style="padding: 6px 14px; font-size: 0.82rem;"><i class="fa-solid fa-truck-fast"></i> Track</a>
          </div>
        </td>
      </tr>
    `;
  });
  tableBody.innerHTML = html;
}

// Render Order Tracking Timeline
function renderOrderTrackingPage() {
  seedDemoOrdersIfEmpty();
  const urlParams = new URLSearchParams(window.location.search);
  const requestedId = urlParams.get('orderId') || 'MDMA-947201';

  const orders = JSON.parse(localStorage.getItem('mdma_spices_orders') || '[]');
  const order = orders.find(o => o.orderId.toUpperCase() === requestedId.toUpperCase()) || orders[0];

  const orderIdHeading = document.getElementById('tracking-order-id');
  const trackingDetailsContainer = document.getElementById('tracking-order-details');
  const searchInput = document.getElementById('tracking-search-input');

  if (orderIdHeading) orderIdHeading.textContent = order ? order.orderId : requestedId;
  if (searchInput) searchInput.value = order ? order.orderId : requestedId;

  if (!order) {
    if (trackingDetailsContainer) {
      trackingDetailsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-dark-muted);">
          <h3>No order found for Reference ID: ${requestedId}</h3>
          <p>Please double-check your Order ID or contact support.</p>
        </div>
      `;
    }
    return;
  }

  // Determine stage status
  const stages = [
    { title: "Order Placed", desc: "Order details received & confirmed", icon: "fa-receipt", time: `${order.orderDate}, 10:30 AM` },
    { title: "Payment Confirmed", desc: `${order.paymentMethod} verified`, icon: "fa-credit-card", time: `${order.orderDate}, 10:35 AM` },
    { title: "Quality & Packaging", desc: "Hygienically sorted & vacuum sealed", icon: "fa-box-open", time: "Next Day, 02:15 PM" },
    { title: "Shipped & In Transit", desc: "Dispatched via Express Courier", icon: "fa-truck-arrow-right", time: "In Transit" },
    { title: "Out for Delivery", desc: "Courier partner en route to your address", icon: "fa-motorcycle", time: order.status === 'Out for Delivery' || order.status === 'Delivered' ? "Today" : "Pending" },
    { title: "Delivered", desc: "Delivered to recipient", icon: "fa-circle-check", time: order.status === 'Delivered' ? order.estimatedDelivery : "Estimated: " + order.estimatedDelivery }
  ];

  let currentStageIndex = 3;
  if (order.status === 'Delivered') currentStageIndex = 5;
  else if (order.status === 'Out for Delivery') currentStageIndex = 4;
  else if (order.status === 'Processing') currentStageIndex = 2;
  else if (order.status === 'Order Placed') currentStageIndex = 1;

  let timelineHtml = `
    <div class="tracking-timeline">
      <div class="tracking-progress-bar" style="width: ${(currentStageIndex / (stages.length - 1)) * 90}%"></div>
  `;

  stages.forEach((stage, idx) => {
    let stateClass = '';
    if (idx < currentStageIndex) stateClass = 'completed';
    else if (idx === currentStageIndex) stateClass = 'active';

    timelineHtml += `
      <div class="timeline-step ${stateClass}">
        <div class="step-circle">
          <i class="fa-solid ${stage.icon}"></i>
        </div>
        <div>
          <div class="step-label">${stage.title}</div>
          <div class="step-time">${stage.time}</div>
        </div>
      </div>
    `;
  });

  timelineHtml += `</div>`;

  if (trackingDetailsContainer) {
    let itemsHtml = '';
    order.items.forEach(i => {
      itemsHtml += `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-light);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${i.image}" alt="${i.name}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 6px;">
            <div>
              <div style="font-weight: 700; font-size: 0.9rem;">${i.name}</div>
              <div style="font-size: 0.78rem; color: var(--text-dark-muted);">${i.weight} • Qty: ${i.qty}</div>
            </div>
          </div>
          <div style="font-weight: 700;">₹${i.price * i.qty}</div>
        </div>
      `;
    });

    trackingDetailsContainer.innerHTML = `
      ${timelineHtml}
      
      <div style="background: var(--bg-light-secondary); border-radius: var(--border-radius-md); padding: 24px; margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
          <h4 style="font-size: 1rem; margin-bottom: 12px; color: var(--color-gold-dark);"><i class="fa-solid fa-location-dot"></i> Delivery Address</h4>
          <p style="font-size: 0.9rem; line-height: 1.6;">
            <strong>${order.customer.name}</strong><br>
            ${order.customer.address}<br>
            Phone: ${order.customer.phone}
          </p>
        </div>
        <div>
          <h4 style="font-size: 1rem; margin-bottom: 12px; color: var(--color-gold-dark);"><i class="fa-solid fa-box"></i> Order Summary (${order.items.length} Products)</h4>
          <div>${itemsHtml}</div>
          <div style="display: flex; justify-content: space-between; font-weight: 800; margin-top: 10px; font-size: 1.05rem; color: var(--color-red);">
            <span>Total Paid</span>
            <span>₹${order.totals.total}</span>
          </div>
        </div>
      </div>
    `;
  }
}
