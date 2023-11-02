import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import  ProductRouter  from './routers/api/products.router.js';
import messageViewRouter from './routers/views/message.router.js';
import CartRoutes from './routers/api/cart.router.js';
import path from 'path'
import morgan from 'morgan';

const app = express();


// use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'handlebars');

// router
app.use('/api', ProductRouter);
app.use('/api', messageViewRouter);
app.use('/api', CartRoutes);




app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error inesperado 😨: ${error.message}`;
  console.error(message);
  res.status(500).json({ message });
});

export default app;