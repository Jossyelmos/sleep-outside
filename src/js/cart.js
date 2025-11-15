import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

// Get the cartContents for the ShoppingCart
const cartItems = getLocalStorage("so-cart");
// Get the product list so we can put the template into it
const listElement = document.querySelector(".product-list");
// Create the new shoppingcart to handle the creation of the cart
const cart = new ShoppingCart(cartItems, listElement);

// Call the init function in the ShoppingCart
cart.init();
