import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId
        this.product = {}
        this.dataSource = dataSource
    };
    
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        
        this.renderProductDetails();

        document.getElementById('addToCart').addEventListener('click', this.addProductToCart.bind(this));

    }

    addProductToCart() {
        const allCart = getLocalStorage("so-cart") || [];
        allCart.push(this.product);
        setLocalStorage("so-cart", allCart);
      }

    renderProductDetails() {
        productDetailsTemplates(this.product);
    }

}

function productDetailsTemplates(product) {
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;
    
    const productImage = document.getElementById('productImage');
    productImage.src = product.Images.PrimaryLarge;
    productImage.alt = product.NameWithoutBrand;
    const euroPrice = new Intl.NumberFormat('de-DE',
        {
          style: 'currency', currency: 'EUR',
        }).format(Number(product.FinalPrice) * 0.85);
    document.querySelector("#p-price").textContent = `${euroPrice}`;

    document.getElementById('productPrice').textContent = product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;
  
    document.getElementById('addToCart').dataset.id = product.Id;
}
