import express from 'express';
import path from 'path';
import expressSession from 'express-session';
import handlebars from 'express-handlebars'
import MongoStore from 'connect-mongo';
import indexRouter from './routers/index.router.js';
import { __dirname } from './utils.js';
import { URI } from './db/mongodb.js'
import sessionsRouter from './routers/sessions.router.js';
import ProductRouterView  from './routers/views/products.router.js';
import { init as initPassportConfig } from './config/passport.config.js';

const app = express();


const SESSION_SECRET = '6+pSmK{q3?w5V2_{.!qR'

app.use(expressSession({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: URI,
    mongoOptions: {},
    ttl: 120,
  }),
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
initPassportConfig();




app.use('/', indexRouter);
app.use('/', ProductRouterView);
app.use('/api', sessionsRouter);

app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: 'error', message });
});

export default app;
