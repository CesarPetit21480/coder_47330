import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  env: process.env.ENV,
  db: {
    mongodbUri: process.env.MONGODB_URI,
  },
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  persistence : process.env.PERSISTENCE
}