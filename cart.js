document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('[data-room]');
  const cartItemsContainer = document.getElementById('cart-items');
  const clearCartButton = document.getElementById('clear-cart');
  const cartCount = document.getElementById('cart-count');
  let newItemsCount = 0; // To track newly added items

  // Update cart badge count
  const updateCartBadge = () => {
    if (cartCount) {
      cartCount.textContent = newItemsCount; // Only show count for newly added items
    }
  };

  // Add rooms to cart
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      const roomName = this.getAttribute('data-room');
      const roomImage = this.getAttribute('data-image'); // Get image URL
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Check if room already exists in cart
      const isRoomInCart = cart.some(room => room.name === roomName);

      if (!isRoomInCart) {
        cart.push({ name: roomName, image: roomImage });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${roomName} added to cart.`);
        newItemsCount++; // Increment new item count
        updateCartBadge(); // Update badge after adding
      } else {
        alert(`${roomName} is already in the cart.`);
      }
    });
  });

  // Render cart
  const renderCart = () => {
    cartItemsContainer.innerHTML = '';
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="text-secondary fs-5">Your cart is empty.</p>';
      return;
    }  

    cart.forEach((room, index) => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div class="row mb-2">
          <div class="col-2">
            <img src="${room.image}" alt="${room.name}" class="img-fluid ratio ratio-1x1">
            <span class="text-dark">${room.name}</span>
          </div>
          <div class="col-10 text-end">
            <button class="remove-btn btn btn-sm btn-danger" data-index="${index}">Remove</button>
          </div>
          <hr>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    // Remove room from cart
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
      button.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        cart.splice(index, 1); // Remove room from cart
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart(); // Re-render cart after removal
        // If item was a new addition, decrement the count
        if (newItemsCount > 0) {
          newItemsCount--;
          updateCartBadge(); // Update badge after removal
        }
      });
    });
  };

  // Clear cart
  if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
      localStorage.removeItem('cart');
      renderCart();
      newItemsCount = 0; // Reset new items count
      updateCartBadge(); // Reset badge to 0
    });
  }

  // Initial rendering and badge setup
  renderCart();
  updateCartBadge(); // Badge starts from new items only
});
