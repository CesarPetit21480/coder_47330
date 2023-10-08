import express from "express";
import morgan from "morgan";
import path from "path";
import { __dirname } from './utils.js';
import productRouter from "./routes/product.routes.js"
import handlebars from 'express-handlebars';

const app = express();

const port = 8080;


// middelware app
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'../public')))


// configurar plantilla
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use('/',productRouter);
  
app.use((error, req, res, next) => {
    const message = `😨 Ah ocurrido un error desconocido: ${error.message}`;
    console.log(message);
    res.status(500).json({ status: 'error', message });
  });
  
  export default app;