
import { Router } from "express";
import passport from "passport";
import CartController from '../../controllers/cart.controller.js';
import { authenticationMiddleware, authorizarionMiddeleware } from '../../utils/util.js'


const router = Router();
router.get("/cart", authenticationMiddleware("jwt"), async (req, res, next) => {

    try {
        const carrito = await CartController.get();

        if (carrito.length === 0) {
            return res.status(400).json({ message: "no existe carrito activo", code: 400 });
        }
        class reporte {
            constructor(producto, subtotal, cantidad, precioUnitario, _id) {
                this.producto = producto;
                this.subtotal = subtotal;
                this.cantidad = cantidad;
                this.precioUnitario = precioUnitario;
                this._id = _id

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
                element.product.price,
                element.product._id


            )
            arrayItem.push(item);
        });
        res.render('facturacion', { idCarrito: carrito[0]._id, facturacion: arrayItem, total: montoTotal, totalItems: totalProductos });

    } catch (error) {
        next(res.status(error.statusCode || 500).json({ message: error.message }));
    }
});

export default router;