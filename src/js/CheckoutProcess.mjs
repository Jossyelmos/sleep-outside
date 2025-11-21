import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSubTotal() {
        // calculate and display the total dollar amount of the items in the cart, and the number of items.
        const summaryElement = document.querySelector(this.outputSelector + "#subtotal");
        const itemNumElement = document.querySelector(this.outputSelector + "#numItems");

        itemNumElement.innerHTML = this.list.length;

        const amount = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amount.reduce((sum, item) => sum + item);
        summaryElement.innerHTML = `$${this.itemTotal}`;
        
      };
    
      calculateOrderTotal() {
        // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
        this.tax = (this.itemTotal * 0.06);
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.orderTotal = parseFloat(this.itemTotal) + parseFloat(this.tax) + parseFloat(this.shipping);
    
        // display the totals.
        this.displayOrderTotals();
      }
    
      displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const total = document.querySelector(`${this.outputSelector} #total`);
    
    
        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        total.innerText = `$${this.total.toFixed(2)}`;
      }
}