import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const productId = getParam("id");

const product = new ProductDetails(category, productId, dataSource);
product.init();
