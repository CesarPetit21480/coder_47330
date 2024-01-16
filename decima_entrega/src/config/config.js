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
  userEmail: process.env.GMAIL_USER,
  userPass: process.env.GMAIL_PASS,
  tokenName: process.env.TOKEN_NAME,

}