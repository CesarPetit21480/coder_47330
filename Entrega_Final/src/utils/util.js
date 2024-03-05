import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import config from '../config/config.js';
import { faker } from '@faker-js/faker';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathFile = path.join(__dirname, '../public/avatars');
    cb(null, pathFile);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

export const uploader = multer({ storage });

export const privateRouter = (req, res, next) => {
  if (!req.body.user) {
    return res.redirect('/login');
  }
  next();
};
export const publicRouters = (req, res, next) => {
  if (req.body.user) {
    return res.redirect('/products');
  }
  next();
}
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => {
  return bcrypt.compareSync(password, user.password);
};

export const JWT_SECRET = config.jwtSecret;

export const tokenGenerator = (user, email, type) => {

  let payload;

  if (user) {
    const { _id, first_name, last_name, email, role } = user;
    payload = {
      id: _id,
      first_name,
      last_name,
      email,
      role,
      type
    };
  }
  else {
    payload = {
      id: undefined,
      first_name: undefined,
      last_name: undefined,
      email,
      role: undefined,
      type
    };
  }

  if (type === 'recovery-deleted')
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '60m' });

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '5m' });
}

export const jwtAuth = (req, res, next) => {

  const token = req.signedCookies["access_token"];

  if (!token) {
    res.redirect('/login');
    //return res.status(401).json({ message: 'unauthorized' });
  }

  jwt.verify(token, JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(404).json({
        success: false,
        code: 'invalid token',
        message: 'Invalid token'
      });
    }
    req.user = payload;
    next();
  });
}


export const jwtAuthUrl = (token) => {


  if (!token) {

    // res.redirect('/login');
  }

  let user;

  jwt.verify(token, JWT_SECRET, (error, payload) => {
    if (error) {
      return undefined;
    }
    user = payload;

  });

  return user;
}

export const isSuperAdmin = (user) => {

  if (user.email === 'adminCoder@coder.com' && user.rol === 'administrador') {
    return true;
  }
  return false;
}

export const authenticationMiddleware = (strategy) => (req, res, next) => {

  passport.authenticate(strategy, { session: false }, (error, payload, info) => {
    if (error) {
      return next(error);
    }
    if (!payload) {
      return res.status(401).json({ message: info.message ? info.message : info.toString() });
    }
    req.user = payload;
    next();
  })(req, res, next);
};

export const authorizarionMiddeleware = (roles) => (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({ message: info.message ? info.message : info.toString() })
  }

  if (roles[0] === "PUBLIC") {
    return next;
  }

  const { role: userRole } = req.user;
  if (!roles.includes(userRole)) {
    return res.status(403).json({ message: 'no permissions' });
  }
  next();
}
export const generateProducts = () => {
  const products = [];
  const limit = 100;
  for (let index = 0; index < limit; index++) {
    products.push(generateProduct());
  }
  return products;
};

export const generateProduct = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productAdjective(),
    description: faker.commerce.productDescription(),
    price: faker.number.float({ min: 10, max: 2500, precision: 0.001 }),
    code: faker.string.alphanumeric({ length: { min: 5, max: 10 } }),
    stock: faker.number.int({ min: 1, max: 1000 }),
    category: faker.datatype.boolean() ? 'VERDURAS' : 'FRUTAS',
    thumbnails: faker.email,
  };
}

export class Exception extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundException extends Exception {
  constructor(message) {
    super(message, 404);
  }
}

export class InvalidDataException extends Exception {
  constructor(message) {
    super(message, 400);
  }
}

export class UnauthorizedException extends Exception {
  constructor(message) {
    super(message, 401);
  }
}

