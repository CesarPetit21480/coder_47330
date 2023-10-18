import { Server } from 'socket.io';
import { ProductsManager } from "../model/productManager.js";
import { v4 as uuidv4 } from "uuid";

let io;
let listaProductos = [];
const path = "./products.json";
const productsManager = new ProductsManager(path);

export const init = (httpServer) => {
    io = new Server(httpServer);
    io.on('connection',async (socketCLient) => {
        console.log(`Nuevo Cliente Conectado: ${socketCLient.id}`);

        listaProductos = await  productsManager.get();
        socketCLient.emit('list-Product', listaProductos );

        // socketCLient.broadcast.emit('new-client');

        socketCLient.on('new-product', async (product) => {

            product.id = uuidv4();
            productsManager.createProduct(product);
            listaProductos = await  productsManager.get();
            socketCLient.broadcast.emit('update-listProducts',listaProductos);

    
        })

        socketCLient.on('delete-product', async(idProduct) => {
            productsManager.deleteProductByid(idProduct);
            listaProductos = await  productsManager.get();
            socketCLient.broadcast.emit('update-listProducts',listaProductos);


        })
    });
    console.log(`sever socket running 🚀🚀🚀`);
}

export const emitFromApi = (event, data) => io.emit(event, data);