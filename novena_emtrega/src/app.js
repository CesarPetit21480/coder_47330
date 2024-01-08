import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars'
import expressSession from 'express-session';
import indexRouter from './routers/api/index.router.js';
import  productRouter from './routers/api/products.router.js';
import userRouter from './routers/api/user.router.js';
import { __dirname } from './utils.js';
import { URI } from './db/mongodb.js'
import ProductRouterView from './routers/views/products.router.js';
import cartViewer from './routers/views/cart.router.js';


import messageViewRouter from './routers/views/message.router.js';
import CartRoutes from './routers/api/cart.router.js';
import { init as initPassportConfig } from './config/passport.config.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import config from './config/config.js';

const app = express();

const SESSION_SECRET = config.sessionSecret;
const COOKIE_SECRET = config.cookieSecret;


app.use(expressSession({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(cookieParser(COOKIE_SECRET));
initPassportConfig();
app.use(passport.initialize());

app.use('/', indexRouter)
app.use('/', ProductRouterView);
app.use('/', cartViewer);
app.use('/api/user', userRouter);
app.use('/api', messageViewRouter);
app.use('/api', CartRoutes);
app.use('/api', productRouter);


app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: 'error', message });
});

export default app;
