import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

// Get the product details
const product = new ProductDetails(productId, dataSource);
product.init();

// Load header and footer
loadHeaderFooter();
