import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.FinalPrice,
      0,
    );

    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    document.querySelector(".card-footer").classList.remove("hide");
    document.querySelector(".total-price").textContent =
      `Total Price: $${totalPrice.toFixed(2)}`;
  } else {
    document.querySelector(".product-list").innerHTML =
      `<p><strong>Your Cart is empty</strong></p>`;
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
