
import { Router } from "express";
import passport from "passport";
import CartController from '../../controllers/cart.controller.js';
import { authenticationMiddleware, authorizarionMiddeleware } from '../../utils/util.js'


const router = Router();
router.get("/cart", authenticationMiddleware("jwt"), async (req, res, next) => {

    try {
        const carrito = await CartController.get();
        class reporte {
            constructor(producto, subtotal,cantidad,precioUnitario) {
                this.producto = producto;
                this.subtotal = subtotal;
                this.cantidad = cantidad;
                this.precioUnitario = precioUnitario;
             
            };
        }

        let arrayItem = []
        let montoTotal = 0;
        let totalProductos = carrito[0].products.length

        const productos = carrito[0].products

        // console.log(productos[0].product.title);

        productos.forEach(element => {

            const subtotal = element.product.price * element.quantity
            montoTotal += subtotal;

            let item = new reporte(
                element.product.title,
                subtotal,
                element.quantity,
                element.product.price
              

            )
            arrayItem.push(item);
        });



        res.render('facturacion', { idCarrito: carrito[0]._id, facturacion: arrayItem, total: montoTotal, totalItems:totalProductos });
    } catch (error) {
        next(res.status(error.statusCode || 500).json({ message: error.message }));
    }
});

export default router;