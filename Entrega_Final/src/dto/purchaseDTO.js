export default class PurchaseDto  {

    constructor(purchase){
        this.id = purchase._id
        this.code = purchase.email;
        this.purchase_datetime = purchase.purchase_datetime;  
        this.amount = purchase.amount;
        this.purchaser = purchase.user.user.email;
        this.products = purchase.cart.cart.products;
    }
}