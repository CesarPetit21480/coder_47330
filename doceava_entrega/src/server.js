import http from 'http';
import app from './app.js';
import { init } from './db/mongodb.js'
import config from './config/config.js';
import { logMessage } from "./config/logger.js"

const server = http.createServer(app);
const PORT = config.port;

await init();

server.listen(PORT, () => {
  logMessage(`Server running in http://localhost:${PORT} ${config.env} 🚀`,"info");

});
