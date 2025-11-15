import { renderListWithTemplate, getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ShoppingCart {
  constructor(cart, listElement) {
    this.cart = cart;
    this.listElement = listElement;
  }

  init() {
    this.cart = getLocalStorage("so-cart") || [];
    this.renderCart();
  }

  renderCart() {
    if (!this.listElement) return;

    if (this.cart.length === 0) {
      this.listElement.innerHTML = `<p><strong>Your Cart is empty</strong></p>`;
      document.querySelector(".card-footer").classList.add("hide");
      return;
    }

    // Render list of items
    renderListWithTemplate(cartItemTemplate, this.listElement, this.cart, "afterbegin", true);

    // Attach remove button listeners
    this.listElement.querySelectorAll(".cartBtn").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        this.removeItem(index);
      });
    });

    // Calculate total
    const total = this.cart.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.querySelector(".total-price").textContent = `Total Price: $${total.toFixed(2)}`;
    document.querySelector(".card-footer").classList.remove("hide");
  }

    removeItem(index) {
      // Remove item from cart array
      this.cart.splice(index, 1);

      // Update localStorage
      setLocalStorage("so-cart", this.cart);

      // Re-render cart
      this.renderCart();
    }
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <button class="cartBtn">❌</button>
      <a href="#" class="cart-card__image">
        <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
}