import http from 'http';
import app from './app.js';
import { init } from './db/mongodb.js'
import config from './config/config.js';

const server = http.createServer(app);
const PORT = config.port;

await init();

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT} ${config.env} 🚀`);
});
