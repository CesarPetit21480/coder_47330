import http from 'http';
import app from './app.js';
import {init} from './socket.js';
//const server = http.createServer(app);
const port = 8080;

const httpServer = app.listen(port, () => {
    console.log(`escuchando en port: ${port}`)
});

init(httpServer);


