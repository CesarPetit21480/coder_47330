import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars'
import expressSession from 'express-session';
import indexRouter from './routers/api/index.router.js';
import productRouter from './routers/api/products.router.js';
import userRouter from './routers/api/user.router.js';
// import { __dirname } from './utils/util.js';
import ProductRouterView from './routers/views/products.router.js';
import cartViewer from './routers/views/cart.router.js';
import messageViewRouter from './routers/views/message.router.js';
import CartRoutes from './routers/api/cart.router.js';
import { init as initPassportConfig } from './config/passport.config.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import config from './config/config.js';
import { fileURLToPath } from 'url';
import { addLogger } from './config/logger.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

const SESSION_SECRET = config.sessionSecret;
const COOKIE_SECRET = config.cookieSecret;

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


app.use(expressSession({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));

app.use(addLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(cookieParser(COOKIE_SECRET));
initPassportConfig();
app.use(passport.initialize());

const swaggerOptions = {
  definition: {
    openaqpi: '3.0.1',
    info: {
      title: 'Cesar Petit API',
      descripcion: 'Documentacion de la API CESAR PETIT para presentar 😊'
    },
  },
  apis: [path.join(__dirname, 'docs', '**', '*.yaml')]
};

const specs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', indexRouter)
app.use('/', ProductRouterView);
app.use('/', cartViewer);
app.use('/api/user', userRouter);
app.use('/api', messageViewRouter);
app.use('/api', CartRoutes);
app.use('/api/products', productRouter);


app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
  req.logger.fatal(message);
  res.status(500).json({ status: 'error', message });
});

export default app;
