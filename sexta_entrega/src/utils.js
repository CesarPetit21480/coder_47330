import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

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
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

export const publicRouters = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/products');
  }
  next();
}

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => {
  return bcrypt.compareSync(password, user.password);
};  