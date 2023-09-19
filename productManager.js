import { Products } from "./model/products.js";

//const prod =  new Product("Manzana","Manzana Deliciosa",2500,'sin imagen','abc123',25);

const products = new Products();

// testing add products
products.addProduct("Naranja", "naranja Deliciosa", 2500, 'sin imagen', 'abc123', 25);
products.addProduct("Naranja", "naranja Deliciosa", 2500, 'sin imagen', 'abc123', 25);

const productos = products.getProducts;



if (productos.length > 0)
    console.log(productos);


// teting product by id

const Resultado = products.getProductsById(0);

console.log(Resultado);

