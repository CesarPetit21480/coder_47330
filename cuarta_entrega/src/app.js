import express from "express";
import handlebars from "express-handlebars";
import morgan from "morgan";
import { __dirname } from "./utils.js";
import path from "path";
import productRouter from "./routes/product.routes.js"

const app = express();


// middelware app
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// motor plantilla

// configurar plantilla
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// llamadas router
app.use('/',productRouter);





app.use((error, req, res, next) => {
    const message = `ha Ocurrido un error desconocido: ${error.message}`;
    console.log(message)
    res.status(500).json({ status: 'error', message })
})



export default app;

