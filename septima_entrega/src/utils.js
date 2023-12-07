import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export class Exception extends Error {

  constructor(message, status) {
    super(message);
    this.statusCode = status;
  }
}
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

export const JWT_SECRET = 'rzA"5--9hg5twXn';

export const tokenGenerator = (user) => {
  const { _id, first_name, last_name, email, role } = user;
  const payload = {
    id: _id,
    first_name,
    last_name,
    email,
    role
  };
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


export const isSuperAdmin = (user) => {

  if (user.email === 'adminCoder@coder.com' && user.rol === 'administrador') {
    return true;
  }
  return false;


}


export const authenticationMiddleware = (strategy) => (req, res, next) => {

  passport.authenticate(strategy, (error, payload, info) => {
    if (error) {
      return next(error);
    }
    if (!payload) {
      return res.status(401).json({ message: info.message ? info.message : info.toString() })
    }

    req.user = payload
    next();

  })(req, res, next);
};


export const authorizarionMiddeleware = (roles) => (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({ message: info.message ? info.message : info.toString() })
  }

  const { role: userRole } = req.user;
  if (!roles.includes(userRole)) {
    return res.status(403).json({ message: 'no permissions' });
  }
  next();
}