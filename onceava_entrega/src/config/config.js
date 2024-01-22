import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  env: process.env.NODE_ENV || 'dev',
  db: {
    mongodbUri: process.env.MONGODB_URI,
  },
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  persistence : process.env.PERSISTENCE,

  mail: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    port: process.env.EMAIL_PORT || 587,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },
 
  tokenName: process.env.TOKEN_NAME,

}