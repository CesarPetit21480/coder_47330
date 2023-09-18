 import { Products } from "./model/products.js";

//const prod =  new Product("Manzana","Manzana Deliciosa",2500,'sin imagen','abc123',25);

const products = new Products();
products.addProduct("Manzana","Manzana Deliciosa",2500,'sin imagen','abc123',25,1);
products.addProduct("Naranja","Manzana Deliciosa",2500,'sin imagen','abc123',25,2);
console.log(products._listProduct);




 