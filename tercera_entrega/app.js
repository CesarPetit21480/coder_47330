import express  from "express";

const app = express();

app.get('/', (req,res)=>{
    res.send('BIENVENIDO AL HOME');
})



app.listen(8080,()=>{
    console.log('Servidor escuchando en el puerto 8080.');
})

