import express, { json } from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from 'url';
import productRouter from "./routes/product.routes.js"



const app = express();
const ___fileName = fileURLToPath(import.meta.url)
const ___dirname = path.dirname(___fileName);
const port = 8080;


// middelware app
app.use(morgan("dev"));
app.use(json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(___dirname,'../public')))

app.use('/api',productRouter);

  

app.listen(port,()=>{
    console.log(`server listen http://localhost:${port}`)
})
